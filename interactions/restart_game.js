var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 
    await restartGame();
    callback();
}

async function restartGame(){
    let instance = await WorldCupGame.deployed();

    // Note that this call will fail with an unhandled promise rejection
    // if the contract's state is anything other than PayoutsCompleted.
    // TODO in the future: add error handling in the case of failure 
    // or go back to promise chaining with .then() and .catch()
    await instance.restartGame({from: web3.eth.accounts[0]});
}