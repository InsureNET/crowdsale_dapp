const TrayToken = artifacts.require("TrayToken");
const CrowdSale = artifacts.require("CrowdSale");

contract("CrowdSale", function(accounts) {
  var token_price = 1000000000000000;     // 0.001 Ether, value give in WEI
  var token;

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
      var one_wei = 1;
      // Buying token
      return crowdsale.buyToken(no_of_tokens, { from: accounts[3], value: amount });
    }).then(function(receipt) {
      // Testing Sell event
      assert.equal(receipt.logs.length, 1, 'Triggered one event');
      assert.equal(receipt.logs[0].event, 'Sell', 'Triggered event with name Sell');
      assert.equal(receipt.logs[0].args._buyer, accounts[3], 'Logs account which bought token');
      assert.equal(receipt.logs[0].args._amount, 10, 'Logs amount of token bought');
      return crowdsale.tokenSold();
    }).then(function(total_token_sold) {
      // Testing bought no of tokens is updated correctly
      assert.equal(total_token_sold, 10, 'sold tokens value incremented check');
      // Trying to buy more tokens then supplied amount
      return crowdsale.buyToken(20, { from: accounts[3], value: 100 });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'Amount sent must be higher');
    })
  })



});
