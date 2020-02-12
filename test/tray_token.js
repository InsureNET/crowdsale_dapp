const TrayToken = artifacts.require("TrayToken");


contract("TrayToken", function(accounts) {

  it("should set total supply upon deployment", async function() {
    return TrayToken.deployed()
      .then(function(instance) { 
        token = instance;
        return token.totalSupply()
      }).then(function(total_supply) {
        assert.equal(total_supply, 1000, 'Sets totalSupply to 1000 tokens');
      });   
  }); 


})
