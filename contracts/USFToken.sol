pragma solidity ^0.5.0;

/* Defining token attributes */
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract USFToken is ERC20Mintable, ERC20Pausable, ERC20Detailed {

  constructor(string memory name, string memory symbol, uint8 decimals)
     ERC20Detailed(name, symbol, decimals)
     public {}
}

//

// contract USFToken {
//   // Setting State Variables, accessable through out the contract
//   // we get getter function for free for public state variable
//   uint256 public totalSupply;
//   string public name = 'USFToken';
//   string public symbol = 'USF';

//   // Tracks the acoounts and how much token it holds in key-value pair
//   mapping(address => uint256) public balanceOf;

//   // Hold howmuch is permitted to transfer for B on A's behalf
//   mapping(address => mapping(address => uint256)) public allowance;

//   event Transfer(
// 	  address indexed _from,
// 	  address indexed _to,
// 	  uint256 _value);

//   event Approval(
// 	  address indexed _owner,
// 	  address indexed _spender,
// 	  uint256 _value);

//   constructor(uint256 _initialSupply) public {
//     // Total number of token
//     totalSupply = _initialSupply;
//     // Setting all minted tokens to admin account
//     balanceOf[msg.sender] = _initialSupply;
//   }

//   function transfer(address _to, uint256 _value) public returns(bool success) {
//     // Checking sender have enough tokens
//     require(balanceOf[msg.sender] >= _value, "");
//     // reducing and incrementing balance
//     balanceOf[msg.sender] -= _value;
//     balanceOf[_to] += _value;

//     emit Transfer(msg.sender, _to, _value);

//     return true;
//   }

//   function approve(address _spender, uint256 _value) public returns(bool success) {
//   // Account A allowing account B to transfer _value tokens on A's suggestion
//     allowance[msg.sender][_spender] = _value;

//     emit Approval(msg.sender, _spender, _value);

//     return true;
//   }

//   // This function is called if sender dont initiate the transfer to transfer token to recepient
//   function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
//     // Condition check
//     require(balanceOf[_from] >= _value, "");
//     require(allowance[_from][msg.sender] >= _value, "");

//     // Incrementing and decrementing value
//     balanceOf[_from] -= _value;
//     balanceOf[_to] += _value;

//     // Update allowance
//     allowance[_from][msg.sender] -= _value;

//     emit Transfer(_from, _to, _value);

//     return true;
//   }

// }
