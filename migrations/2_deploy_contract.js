const TrayToken = artifacts.require("TrayToken");
const CrowdSale = artifacts.require("CrowdSale");

module.exports = function(deployer) {
  deployer.deploy(TrayToken, 1000).then(function(instance) {
    deployer.deploy(CrowdSale, instance.address);
  })
};
