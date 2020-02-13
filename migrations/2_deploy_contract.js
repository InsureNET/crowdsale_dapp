const TrayToken = artifacts.require("TrayToken");
const CrowdSale = artifacts.require("CrowdSale");

module.exports = function(deployer) {
  deployer.deploy(TrayToken, 1000).then(function(instance) {
    // Token price in WEI wihich equals 0.001 Ether
    token_price = 1000000000000000;
    return deployer.deploy(CrowdSale, instance.address, token_price);
  })
};
