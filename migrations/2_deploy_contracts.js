const OathKeeper = artifacts.require("OathKeeper");

module.exports = function (deployer) {
    deployer.deploy(OathKeeper);
};
