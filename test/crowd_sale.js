const CrowdSale = artifacts.require("CrowdSale");

contract("CrowdSale", function(accounts) {
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
    })
  });
});
