const CrowdSale = artifacts.require("CrowdSale");

contract("CrowdSale", function(accounts) {
  var token_price = 1000000000000000;     // 0.001 Ether, value give in WEI

  it("Initialization Check", async function() {
    return CrowdSale.deployed().then(function(instance) {
      crowdsale = instance;
      return crowdsale.address;
    }).then(function(address) {
      // Testing deployed Crowdsale contract adress is not null
      assert.notEqual(address, 0x0, 'contract address not empty check');
      return crowdsale.tokenContract();
    }).then(function(address) {
      // Testing received contract address in not null	    
      assert.notEqual(address, 0x0, 'Token contract address not empty check');
      return crowdsale.tokenPrice();
    }).then(function(price) {
      assert.equal(price, token_price, 'Token price set correctly check');
    })
  });
});
