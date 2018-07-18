var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 

    let teams = await getTeamNames();

    let winner = "France";
    console.log(`\nDeclaring ${winner} as the winner!`);
    await declareWinner(winner);

    console.log("\n\n");
    console.log(await fetchGameState());
    console.log("\n\n");
    callback();
}

function getTeamNames(){
    return WorldCupGame.deployed()
    .then(function(instance){
        return instance.getTeamNames();
    })
    .then(function(result){
        return result.map(v=>web3.toAscii(v).replace(/\0/g, ''));
    });
}

function declareWinner(teamName){
    return WorldCupGame.deployed()
    .then(function(instance){
        return instance.declareWinner(teamName, {from: web3.eth.accounts[0]});
    })
    .then(function(result){
        console.log("winner declared, payouts done");
        console.log("Transaction id: ");
        console.log(result.tx);
        return true;
    })
    .catch(function(e) {
        console.log("ERROR declaring winner");
        //console.log(e);
        return false;
    });
}

async function fetchGameState(){
    let STATE = {
        gameIteration: -1,
        currentState: -1,
        teamNamesAscii: [],
        voteCounts: [],
        voteBackings: [],
        totalVotes: -1,
        totalBacking: -1,
        contractBalance: -1
    };

    let instance = await WorldCupGame.deployed();
    let teamNames = await instance.getTeamNames();

    for (var teamBytes32 of teamNames){
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