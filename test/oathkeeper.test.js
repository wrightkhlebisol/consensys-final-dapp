let OathKeeper = artifacts.require("./OathKeepr.sol");

contract("OathKeeper", function (accounts) {
    let oathKeeperInstance;

    it("", function () {
        return OathKeeper.deployed().then(function (instance) {
            return instance.
        }).then(function () {
            assert.equual();
        })
    })

    it("", function () {
        return OathKeeper.deployed().then(function (instance) {
            oathKeeperInstance = instance;
            return oathKeeperInstance.
        }).then(function () {
            assert.equal();
        })
    })
})
