const USFToken = artifacts.require("USFToken");


contract("USFToken", function(accounts) {

  it("should initialize contract with correct values", async function() {
    return USFToken.deployed().then(function(instance) {
      token = instance;
      return token.name();
    }).then(function(token_name) {
      assert.equal(token_name, 'USFToken', 'Token name check');
      return token.symbol();
    }).then(function(token_symbol) { 
      assert.equal(token_symbol, 'USF', 'Token symbol check');
    });
  })


  it("should set total supply upon deployment", async function() {
    return USFToken.deployed()
      .then(function(instance) { 
        token = instance;
        return token.totalSupply()
      }).then(function(total_supply) {
        assert.equal(total_supply, 1000000000, 'Sets totalSupply to 1,000,000,000 tokens');
      });
  })


  it("Should transfer minted tokens to admin account", async function() {
    return USFToken.deployed().then(function(instance) {
      token = instance;
      return token.balanceOf(accounts[0]);
    }).then(function(admin_tokens) {
      assert.equal(admin_tokens, 1000000, 'Tokens transfered to admin account');
    });
  })


  it("Should transfer token and there must reduction in token", async function() {
    return USFToken.deployed().then(function(instance) {
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
  })


  it("approval function check", async function() {
    return USFToken.deployed().then(function(instance) {
      token = instance;
      return token.approve.call(accounts[1], 200);
    }).then(function(return_value) {
      assert.equal(return_value, true, 'Return value from approve function check');
      return token.approve(accounts[1], 100);
    }).then(function(receipt) {
      // Testing Approval Event
      assert.equal(receipt.logs.length, 1, 'One event triggered');
      assert.equal(receipt.logs[0].event, 'Approval', 'Confirmed the event is Approval');
      assert.equal(receipt.logs[0].args._owner, accounts[0], 'Owner account check');
      assert.equal(receipt.logs[0].args._spender, accounts[1], 'Spender account check');
      assert.equal(receipt.logs[0].args._value, 100, 'Amount to transfer check');
      return token.allowance(accounts[0], accounts[1]);
    }).then(function(allowance_value) {
      assert.equal(allowance_value, 100, 'Approval confirmation check');
    });
  })


  it("TransferFrom function check", async function() {
    return USFToken.deployed().then(function(instance) {
      token = instance;
      from_A = accounts[2];     // A who approves B to transfer her token
      spender_B = accounts[3];  // B who transfer token from A to anybody
      to_C = accounts[4];       // C who receives token
      // Transfer some tokens
      return token.transfer(from_A, 300, { from: accounts[0] });
    }).then(function(receipt) {
      // Approving B to transfer max of 200 tokens on A's behalf
      return token.approve(spender_B, 200, { from: from_A });
    }).then(function(receipt) {
      // Trying to transfer larger token than A's having
      return token.transferFrom(from_A, to_C, 400, { from: spender_B } );
    }).then(assert.fail).catch(function(error_status) {
      // Testing CHECK	    
      assert(error_status.message.indexOf('revert') >= 0, 'Cannot transfer larger value of token than from A');
      // Trying to transfer larger value than approved amount of token
      return token.transferFrom(from_A, to_C, 201, { from: spender_B });
    }).then(assert.fail).catch(function(error_status) {
      // Testing require	    
      assert(error_status.message.indexOf('revert') >=0, 'Cannot transfer larger than approved amount for B');
    });
  });


})
