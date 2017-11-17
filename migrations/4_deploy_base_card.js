var BaseCard = artifacts.require("./BaseCard.sol");

module.exports = function(deployer) {
    deployer.deploy(BaseCard);
};
