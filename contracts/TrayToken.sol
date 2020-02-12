pragma solidity >= 0.5.0 < 0.7.0;

contract TrayToken {
  // Setting State Variables, accessable through out the contract
  // we get getter function for free for public state variable
  uint256 public totalSupply;
  string public name = 'TrayToken';
  string public symbol = 'TR';
  // Tracks the acoounts and how much token it holds in key-value pair
  mapping(address => uint256) public balanceOf;

  event Transfer(
	  address indexed _from,
	  address indexed _to,
	  uint256 _value);


  constructor(uint256 _initialSupply) public {
    // Total number of token
    totalSupply = _initialSupply;
    // Setting all minted tokens to admin account
    balanceOf[msg.sender] = _initialSupply;
  }

 
  function transfer(address _to, uint256 _value) public returns(bool success) {
    // Checking sender have enough tokens
    require(balanceOf[msg.sender] >= _value);
    // reducing and incrementing balance
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);
    return true;
  }

}
