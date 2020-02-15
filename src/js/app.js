App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    console.log("Initialization Done")
    App.initWeb3();
  },

  
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If web3 instance is already provided by MetaMask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider)
    } else {
      // Create special instance if web3 is not provided
      App.web3Provider = new Web3.providers.HttpProvider('http:localhost:8545');
      web3 = new Web3(App.web3Provider)
    }
    App.initContracts();
  },


  initContracts: function() {
    // Getting instance of CrowdSale contract
    $.getJSON("CrowdSale.json", function(crowdsale) {
      App.contracts.CrowdSale = TruffleContract(crowdsale);
      App.contracts.CrowdSale.setProvider(App.web3Provider);
      App.contracts.CrowdSale.deployed().then(function(instance) {
        console.log("Contract Address: ", instance.address);
      });
    
    }).done(function() {
      // Getting instance of Token contract
      $.getJSON("TrayToken.json", function(tray_token) {
        App.contracts.TrayToken = TruffleContract(tray_token);
        App.contracts.TrayToken.setProvider(App.web3Provider);
        App.contracts.TrayToken.deployed().then(function(instance) {
          console.log("Token Address: ", instance.address);
	});
      })
    })
  }

}




// To call the app initialization function
$(function() {
  $(window).ready(function() {
    App.init();
  })
});
