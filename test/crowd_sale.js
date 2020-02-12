const CrowdSale = artifacts.require("CrowdSale");

contract("CrowdSale", function(accounts) {
  it("Initialization Check", async function() {
    return CrowdSale.deployed().then(function(instance) {
      crowdsale = instance;
      return crowdsale.address;
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'contract has address');
      return crowdsale.tokenContract();
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'Token contract address not empty');
    })
  });
});
