pragma solidity >= 0.5.0 < 0.7.0;

import "./TrayToken.sol";


contract CrowdSale {

  // State variable list
  address admin;
  // variable to hold address of Token contract
  TrayToken public tokenContract;


  constructor(TrayToken _tokenContract) public {
    // Address which deploy this contract will become admin	  
    admin = msg.sender;
    tokenContract = _tokenContract;
  }


}
