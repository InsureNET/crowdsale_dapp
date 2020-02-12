const TrayToken = artifacts.require("TrayToken");

module.exports = function(deployer) {
  deployer.deploy(TrayToken, 1000);
};
