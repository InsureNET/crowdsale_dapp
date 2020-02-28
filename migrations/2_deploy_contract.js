const USFToken = artifacts.require("USFToken");
const USFTokenCrowdsale = artifacts.require("USFTokenCrowdsale");

/* Token Parameter */ 
const name = "US Forestry Token";
const symbol = "USF";
const decimals = 18;


module.exports = function(deployer) {
  /* Passing constructor value */
  // then(deployer.deploy());
  deployer.deploy(USFToken, name, symbol, decimals).then(function(instance) {
    // Token price in WEI wihich equals 0.01 Ether
    token_price = 100000000000000;
    return deployer.deploy(USFTokenCrowdsale, instance.address, token_price);
  })
};

