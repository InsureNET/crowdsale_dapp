App = {
  web3Provider: null,

  init: function() {
    console.log("Initialization Done")
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefined') {
      // web3 instance is provided by MetaMask
      web3 = new Web3(App.web3Provider);
    } else {
      // default instance of web3
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
  }
}




// To call the app initialization function
$(function() {
  $(window).ready(function() {
    App.init();
  })
});
