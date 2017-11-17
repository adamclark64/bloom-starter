const CardLauncher = artifacts.require("./CardLauncher.sol");

module.exports = function(deployer, network, accounts) {
    const wallet = accounts[0]

    deployer.deploy(CardLauncher, wallet)
};
