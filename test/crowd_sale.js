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


  it("buyToken function Check", async function() {
    return CrowdSale.deployed().then(function(instance) {
      // Setup parameter	    
      crowdsale = instance;
      var no_of_tokens = 10;
      var amount = token_price * no_of_tokens;
      // Buying token
      return crowdsale.buyToken(no_of_tokens, { from: accounts[3], value: amount });
    }).then(function(receipt) {
      return crowdsale.tokenSold();
    }).then(function(total_token_sold) {
      // Testing bought no of tokens is updated correctly
      assert.equal(total_token_sold, 10, 'sold tokens value incremented check');
    });
  });

});
