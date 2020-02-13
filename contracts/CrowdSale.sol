pragma solidity >= 0.5.0 < 0.7.0;

import "./TrayToken.sol";


contract CrowdSale {

  // State variable list
  address admin;
  // variable to hold address of Token contract
  TrayToken public tokenContract;
  // Price of token in wei
  uint256 public tokenPrice;
  // Total tokens sold
  uint256 public tokenSold; 


  constructor(TrayToken _tokenContract, uint256 _tokenPrice) public {
    // Address which deploy this contract will become admin	  
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  function buyToken(uint256 _numberOfTokens) public payable {
    // Check sent amount/value can able to buy given number of tokens
    // Check contract has enough tokens
    // Check transfer of amount/value is successful

    // Update total no of tokens sold
    tokenSold += _numberOfTokens;
    // Emit event since transfer is taking place

  }
}
