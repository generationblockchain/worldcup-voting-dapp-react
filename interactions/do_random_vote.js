var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 

    let teams = await getTeamNames();
    console.log(teams);

    console.log("\n\n");
    console.log(await fetchGameState());
    console.log("\n\n");
    
    await submitRandomVote(teams);

    console.log("\n\n");
    console.log(await fetchGameState());
    console.log("\n\n");

    callback();
}

function getRandomAccountIndex(){
    return Math.floor(Math.random()*web3.eth.accounts.length);
}

function getRandomTeamName(options){
    return options[Math.floor(Math.random()*options.length)];
}

// between 0 ETH and 5 ETH (non-inclusive)
function getRandomEtherAmount(){
    return (Math.random()*5);
}

async function submitRandomVote(teams){
    const fromAccountIndex = getRandomAccountIndex();
    const fromAccount = web3.eth.accounts[fromAccountIndex];

    const voteAmount = getRandomEtherAmount();
    const voteForTeam = getRandomTeamName(teams);

    console.log(`Account [${fromAccountIndex}] voted for ${voteForTeam}: ${voteAmount} ETH`);
    await submitVote(voteForTeam, fromAccount, voteAmount);

    return true;
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


function submitVote(teamName, voterAddress, etherAmount){

    var voteBacking = web3.toWei(etherAmount, "ether");

    return WorldCupGame.deployed()
    .then(function(instance){
        return instance.voteForTeam(teamName, {from: voterAddress, value: voteBacking});
    })
    .then(function(result) {
        console.log("\nSubmitted vote, transaction id: ");
        console.log(result.tx);
        
        return true;

    }).catch(function(e) {
        console.log("ERROR submitting vote");
        //console.log(e);
        return false;
    });
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