var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

module.exports = function(deployer) {
    const teams = ["Brazil", "France", "Croatia", "Italy", "Mexico", "India", "Argentina", "Germany"];
    deployer.deploy(WorldCupGame, teams);
};
