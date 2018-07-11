var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = function(callback) { 
    //printTeamNames();
    printGameState();
}

function printTeamNames(){
    WorldCupGame.deployed()
    .then(function(instance){
        return instance.getTeamNames();
    })
    .then(function(result){
        console.log(result);
        for (var teamBytes32 of result){
            console.log(web3.toAscii(teamBytes32));
        }
    });
}

function printGameState(){
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

    WorldCupGame.deployed()
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

        // console.log("Received team names: ");
        // console.log(teamNamesAscii);
        
        return Promise.all(voteCountPromises);
    })
    .then(function(voteCountValues){
        state.voteCounts = voteCountValues.map(v => v.toNumber());

        // console.log("Received vote counts: ");
        // console.log(voteCounts);

        for (var teamBytes32 of state.teamNames){
            voteBackingPromises.push(instance.getVoteBackingInWeiForTeam(teamBytes32));
        }

        return Promise.all(voteBackingPromises);
        
    })
    .then(function(voteBackingValues){
        state.voteBackings = voteBackingValues.map(v => v.toNumber());
        // console.log("Received vote backings: ");
        // console.log(voteBackings);

        return instance.getTotalVoteCount();
    })
    .then(function(totalNumVotes){
        state.totalVotes = totalNumVotes.toNumber();

        return instance.getTotalVoteBackingInWei();
    })
    .then(function(totalVoteBacking){
        state.totalBacking = totalVoteBacking.toNumber();
        
        console.log(state);
        
        return state;
    });
}