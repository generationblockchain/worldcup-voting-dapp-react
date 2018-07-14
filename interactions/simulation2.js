var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 

    // Acct 0 deploys contract
    // Teams = ["Italy", "Mexico", "France"]

    // Acct 1 votes for Italy, 1 ETH = 2/3
    // Acct 4 votes for Italy, 0.5 ETH = 1/3

    // Acct 2 votes for Mexico, 0.5 ETH
    
    // Acct 3 votes for France, 0.5 ETH
    
    // 3 ETH total
    // Italy wins
    // Acct 1 and 4 split the 3 ETH

    // Acct 1 should receive 2/3 of total = 2.5 ETH = 1.666 ETH = final balance of 100 - 1 + 1.666 = 100.66
    // Acct 4 should receive 1/3 of total = 2.5 ETH = 0.8333 ETH = final balance of 100 - 0.5 + 0.833 = 100.33

    let teams = await getTeamNames();
    console.log(teams);

    console.log("\n\n");
    console.log(await fetchGameState());
    console.log("\n\n");
    
    // vote italy
    await submitVote(teams[0], web3.eth.accounts[1], 1.0);
    await submitVote(teams[0], web3.eth.accounts[4], 0.5);

    // vote mexico
    await submitVote(teams[1], web3.eth.accounts[2], 0.5);
    
    // vote france
    await submitVote(teams[2], web3.eth.accounts[3], 0.5);
    

    console.log("\n\n");
    console.log(await fetchGameState());

    console.log("\n\nAttempting to declare Italy winner!");
    await declareWinner("Italy");

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
    .then(function(outcome){
        console.log("winner declared, payouts done");
        return true;
    })
    .catch(function(e) {
        console.log("ERROR declaring winner");
        //console.log(e);
        return false;
    });
}

function submitVote(teamName, voterAddress, etherAmount){

    var voteBacking = web3.toWei(etherAmount, "ether");

    return WorldCupGame.deployed()
    .then(function(instance){
        return instance.voteForTeam(teamName, {from: voterAddress, value: voteBacking});
    })
    .then(function(result) {
        // result.tx => transaction hash, string
        // result.logs => array of trigger events (1 item in this case)
        // result.receipt => receipt object
        console.log("\nSubmitted vote, transaction id: ");
        console.log(result.tx);
        
        /*console.log("\n");
        console.log(result.logs);
        console.log("\n");
        console.log(result.receipt);
        */

        return true;

    }).catch(function(e) {
        console.log("ERROR submitting vote");
        //console.log(e);
        return false;
    });
}

async function restartGame(){
    let instance = await WorldCupGame.deployed();
    await instance.restartGame({from: web3.eth.accounts[0]});
}

function fetchGameState(){
    
    let instance = null;
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

    let voteCountPromises = [];
    let voteBackingPromises = [];

    return WorldCupGame.deployed()
    .then(function(_instance){
        instance = _instance;
        return instance.getTeamNames();
    })
    .then(function(_teamNames){
        STATE.teamNames = _teamNames;
        for (var teamBytes32 of _teamNames){
            voteCountPromises.push(instance.getVoteCountForTeam(teamBytes32));
            STATE.teamNamesAscii.push(web3.toAscii(teamBytes32).replace(/\0/g, ''));
        }        
        return Promise.all(voteCountPromises);
    })
    .then(function(voteCountValues){
        STATE.voteCounts = voteCountValues.map(v => v.toNumber());
        for (var teamBytes32 of STATE.teamNames){
            voteBackingPromises.push(instance.getVoteBackingInWeiForTeam(teamBytes32));
        }
        return Promise.all(voteBackingPromises);
    })
    .then(function(voteBackingValues){
        STATE.voteBackings = voteBackingValues.map(v => v.toNumber());
        return instance.getTotalVoteCount();
    })
    .then(function(totalNumVotes){
        STATE.totalVotes = totalNumVotes.toNumber();
        return instance.getTotalVoteBackingInWei();
    })
    .then(function(totalVoteBacking){
        STATE.totalBacking = totalVoteBacking.toNumber();
        return instance.getContractBalance();
    })
    .then(function(balance){
        STATE.contractBalance = balance.toNumber();
        return instance.getGameIteration();
    })
    .then(function(gameIterationIndex){
        STATE.gameIteration = gameIterationIndex.toNumber();
        return instance.getCurrentState();
    })
    .then(function(stateAsInteger){
        const possibleStates = ["AcceptingVotes", "WinnerDeclared", "PayoutsCompleted"];
        STATE.currentState = possibleStates[stateAsInteger.toNumber()];

        return STATE;
    });
    
}