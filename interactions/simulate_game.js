var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 
    let teams = await getTeamNames();
    console.log(teams);

    let state_0 = await fetchGameState();
    console.log(initial_state);

    submitVote(teams[0], web3.eth.accounts[1], 0.1);
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

function submitVote(teamName, fromAddress, etherAmount){

    // Anshul TODO today (thursday)
    
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

        return state;
    });
}