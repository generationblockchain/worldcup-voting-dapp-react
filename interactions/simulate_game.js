var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 
    let teams = await getTeamNames();
    console.log(teams);

    let state_0 = await fetchGameState();
    console.log(state_0);

    let voteSuccess = await submitVote(teams[0], web3.eth.accounts[1], 0.1);

    let state_1 = await fetchGameState();
    console.log(state_1);
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
        // result.tx => transaction hash, string
        // result.logs => array of trigger events (1 item in this case)
        // result.receipt => receipt object
        console.log(result.tx);
        console.log("\n");
        console.log(result.logs);
        console.log("\n");
        console.log(result.receipt);

        return true;

    }).catch(function(e) {
        return false;
    });
}

function fetchGameState(){
    let instance = null;

    let state = {
        teamNames: [],
        teamNamesAscii: [],
        voteCounts: [],
        voteBackings: [],
        totalVotes: -1,
        totalBacking: -1
    };

    let voteCountPromises = [];
    let voteBackingPromises = [];

    return WorldCupGame.deployed()
    .then(function(_instance){
        instance = _instance;
        return instance.getTeamNames();
    })
    .then(function(_teamNames){

        state.teamNames = _teamNames;
        

        for (var teamBytes32 of _teamNames){
            voteCountPromises.push(instance.getVoteCountForTeam(teamBytes32));
            state.teamNamesAscii.push(web3.toAscii(teamBytes32).replace(/\0/g, ''));
        }

        
        return Promise.all(voteCountPromises);
    })
    .then(function(voteCountValues){
        state.voteCounts = voteCountValues.map(v => v.toNumber());


        for (var teamBytes32 of state.teamNames){
            voteBackingPromises.push(instance.getVoteBackingInWeiForTeam(teamBytes32));
        }

        return Promise.all(voteBackingPromises);
        
    })
    .then(function(voteBackingValues){
        state.voteBackings = voteBackingValues.map(v => v.toNumber());

        return instance.getTotalVoteCount();
    })
    .then(function(totalNumVotes){
        state.totalVotes = totalNumVotes.toNumber();

        return instance.getTotalVoteBackingInWei();
    })
    .then(function(totalVoteBacking){
        state.totalBacking = totalVoteBacking.toNumber();

        return state;
    });
}