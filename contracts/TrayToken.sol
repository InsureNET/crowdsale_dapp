pragma solidity >= 0.5.0 < 0.7.0;

contract TrayToken {
  
  // Setting State Variables, accessable through out the contract
  // we get getter function for free for public state variable
  uint256 public totalSupply;


  constructor() public {
    // Total number of token
    totalSupply = 1000;

  }
}
