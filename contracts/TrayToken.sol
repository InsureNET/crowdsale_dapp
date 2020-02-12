pragma solidity >= 0.5.0 < 0.7.0;

contract TrayToken {
  // Setting State Variables, accessable through out the contract
  // we get getter function for free for public state variable
  uint256 public totalSupply;
  string public name = 'TrayToken';
  string public symbol = 'TR';
  
  // Tracks the acoounts and how much token it holds in key-value pair
  mapping(address => uint256) public balanceOf;

  // Hold howmuch is permitted to transfer for B on A's behalf
  mapping(address => mapping(address => uint256)) public allowance;

  event Transfer(
	  address indexed _from,
	  address indexed _to,
	  uint256 _value);

  event Approval(
	  address indexed _owner,
	  address indexed _spender,
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


  function approve(address _spender, uint256 _value) public returns(bool success) {
    // Account A allowing account B to transfer _value tokens on A's suggestion	  
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
  }

  
  // This function is called if sender dont initiate the transfer to transfer token to recepient	
  function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
    require(balanceOf[_from] >= _value);

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(_from, _to, _value);

    return true;
  }

}
