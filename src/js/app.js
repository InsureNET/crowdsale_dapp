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
  }

}




// To call the app initialization function
$(function() {
  $(window).ready(function() {
    App.init();
  })
});
