const TrayToken = artifacts.require("TrayToken");
const CrowdSale = artifacts.require("CrowdSale");

module.exports = function(deployer) {
  deployer.deploy(TrayToken, 1000);
  deployer.deploy(CrowdSale, TrayToken.address);
};
