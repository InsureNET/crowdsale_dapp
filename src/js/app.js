App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    console.log("Initialization Done")
  }

}




// To call the app initialization function
$(function() {
  $(window).ready(function() {
    App.init();
  })
});
