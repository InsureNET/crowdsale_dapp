const crowdsale = artifacts.require("crowdsale");

contract("crowdsale", function() {
  it("should assert true", async function(done) {
    await crowdsale.deployed();
    assert.isTrue(true);
    done();
  });
});
