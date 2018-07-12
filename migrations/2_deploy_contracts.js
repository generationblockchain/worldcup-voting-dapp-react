var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = function(deployer) {
  deployer.deploy(WorldCupGame, ["Italy", "Mexico", "France"]);
};
