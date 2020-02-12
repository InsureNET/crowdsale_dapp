const TrayToken = artifacts.require("TrayToken");


contract("TrayToken", function(accounts) {
  var token;

  it("should initialize contract with correct values", async function() {
    return TrayToken.deployed().then(function(instance) {
      token = instance;
      return token.name();
    }).then(function(token_name) {
      assert.equal(token_name, 'TrayToken', 'Token name check');
      return token.symbol();
    }).then(function(token_symbol) { 
      assert.equal(token_symbol, 'TR', 'Token symbol check');
    });
  })


  it("should set total supply upon deployment", async function() {
    return TrayToken.deployed()
      .then(function(instance) { 
        token = instance;
        return token.totalSupply()
      }).then(function(total_supply) {
        assert.equal(total_supply, 1000, 'Sets totalSupply to 1000 tokens');
      });
  })


  it("Should transfer minted tokens to admin account", async function() {
    return TrayToken.deployed().then(function(instance) {
      token = instance;
      return token.balanceOf(accounts[0]);
    }).then(function(admin_tokens) {
      assert.equal(admin_tokens, 1000, 'Tokens transfered to admin account');
    });
  })


  it("Should transfer token and there must reduction in token", async function() {
    return TrayToken.deployed().then(function(instance) {
      token = instance;
      return token.transfer.call(accounts[1], 500, { from: accounts[0] });
    }).then(function(return_value) {
      assert.equal(return_value, true, 'Return value from transfer function check');
      return token.transfer(accounts[1], 500, { from: accounts[0] });
    }).then(function(receipt) {
      // Testing Transfer Event
      assert.equal(receipt.logs.length, 1, 'One event triggered');
      assert.equal(receipt.logs[0].event, 'Transfer', 'Confirmed the event is TRANSFER');
      assert.equal(receipt.logs[0].args._from, accounts[0], 'Sender account check');
      assert.equal(receipt.logs[0].args._to, accounts[1], 'Recepient account check');
      assert.equal(receipt.logs[0].args._value, 500, 'Amount to transfer check');	
      return token.balanceOf(accounts[1]);
    }).then(function(balance) {
      assert.equal(balance, 500, 'Token received by the recepient');
      return token.balanceOf(accounts[0]);
    }).then(function(balance) { 
      assert.equal(balance, 500, 'Token deducted from the sender');
    });
  }); 


})
