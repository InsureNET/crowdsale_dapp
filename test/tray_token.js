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
  });


})
