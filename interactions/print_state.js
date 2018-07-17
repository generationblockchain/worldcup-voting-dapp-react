var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 

    console.log("\n");
    console.log(await fetchGameState());
    console.log("\n");
    
    callback();
}

async function fetchGameState(){

    let STATE = {
        gameIteration: -1,
        currentState: -1,
        teamNames: [],
        teamNamesAscii: [],
        voteCounts: [],
        voteBackings: [],
        totalVotes: -1,
        totalBacking: -1,
        contractBalance: -1
    };

    let instance = await WorldCupGame.deployed();
    STATE.teamNames = await instance.getTeamNames();

    for (var teamBytes32 of STATE.teamNames){
        STATE.voteCounts.push((await instance.getVoteCountForTeam(teamBytes32)).toNumber());
        STATE.voteBackings.push((await instance.getVoteBackingInWeiForTeam(teamBytes32)).toNumber());
        STATE.teamNamesAscii.push(web3.toAscii(teamBytes32).replace(/\0/g, ''));
    }

    STATE.totalVotes = (await instance.getTotalVoteCount()).toNumber();
    STATE.totalBacking = (await instance.getTotalVoteBackingInWei()).toNumber();
    STATE.contractBalance = (await instance.getContractBalance()).toNumber();
    STATE.gameIteration = (await instance.getGameIteration()).toNumber();
    STATE.lastWinner = web3.toAscii(await instance.getLastWinner()).replace(/\0/g, '');

    const possibleStates = ["AcceptingVotes", "WinnerDeclared", "PayoutsCompleted"];
    STATE.currentState = possibleStates[(await instance.getCurrentState()).toNumber()];

    return STATE;

}