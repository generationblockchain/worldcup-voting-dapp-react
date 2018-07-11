var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(WorldCupGame, ["Italy", "Mexico", "France"]);
};
