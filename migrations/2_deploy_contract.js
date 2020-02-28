const USFToken = artifacts.require("USFToken");
const CrowdSale = artifacts.require("CrowdSale");

module.exports = function(deployer) {
  deployer.deploy(USFToken, 1000000000).then(function(instance) {
    // Token price in WEI wihich equals 0.01 Ether
    token_price = 100000000000000;
    return deployer.deploy(CrowdSale, instance.address, token_price);
  })
};
