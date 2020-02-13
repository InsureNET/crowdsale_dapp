pragma solidity >= 0.5.0 < 0.7.0;

import "./TrayToken.sol";
import "../installed_contracts/zeppelin/contracts/math/SafeMath.sol";

contract CrowdSale {

  using SafeMath for uint256;

  // State variable list
  address admin;
  // variable to hold address of Token contract
  TrayToken public tokenContract;
  // Price of token in wei
  uint256 public tokenPrice;
  // Total tokens sold
  uint256 public tokenSold; 

  event Sell(address indexed _buyer, uint256 _amount);


  constructor(TrayToken _tokenContract, uint256 _tokenPrice) public {
    // Address which deploy this contract will become admin	  
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }


  function buyToken(uint256 _numberOfTokens) public payable {
    // Check sent amount/value can able to buy given number of tokens
    require(msg.value == _numberOfTokens.mul(tokenPrice));
    
    // Check contract has enough tokens
    require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);    

    // Transfer of token to caller of crowdsale contract and check if  successful
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    // Update total no of tokens sold
    tokenSold += _numberOfTokens;

    // Emit event since transfer is taking place
    emit Sell(msg.sender, _numberOfTokens);
  }


  function endSale() public {
    // Require admin 
    require(msg.sender == admin);
    
    // Transfer remaining tokens from contract to admin wallet
    require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this) ) ) );
    
    // Destroy CrowdSale contract
    // Conversion of 'address' type to 'payable address' type
    // convertion of address to uint160 and back to address make it 'payable address' type
    selfdestruct(address(uint160(admin)));
  }	  
  
}
