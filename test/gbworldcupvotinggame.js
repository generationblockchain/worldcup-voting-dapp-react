var WorldCupGame = artifacts.require("./GBWorldCupVotingGame.sol");

contract('WorldCupGame', function (accounts) {

    it("...should have initialized with 3 teams.", function () {
        return WorldCupGame.deployed().then(function (_instance) {
            instance = _instance;

            //return instance.set(89, {from: accounts[0]});
            return instance.getTeamCount.call();
        }).then(function (result) {
            console.log(result);
            assert.equal(result.length, 3, "# of teams is NOT equal to 3");
        });
    });
});
