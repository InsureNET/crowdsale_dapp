const TrayToken = artifacts.require("TrayToken");


contract("TrayToken", function(accounts) {
  var token;

  it("should set total supply upon deployment", async function() {
    return TrayToken.deployed()
      .then(function(instance) { 
        token = instance;
        return token.totalSupply()
      }).then(function(total_supply) {
        assert.equal(total_supply, 1000, 'Sets totalSupply to 1000 tokens');
	return token.balanceOf(accounts[0]);
      }).then(function(admin_tokens) {
	assert.equal(admin_tokens, 1000, 'Transfer tokens to admin account');
         });
  }); 


})
