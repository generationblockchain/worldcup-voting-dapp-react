var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = async function(callback) { 
    await restartGame();
    callback();
}

async function restartGame(){
    let instance = await WorldCupGame.deployed();
    await instance.restartGame({from: web3.eth.accounts[0]});
}