pragma solidity ^0.4.19;
contract Lottery{
    address public manager;
    address[] public players;
    modifier restricted(){
        require(msg.sender==manager,"Only woner of contract can pickWinner");
        _;
    }
    constructor() public {
        manager = msg.sender;
    }
    function enter() public payable {
        require(msg.value>0.01 ether,"should be greater than 0.01 ether");
        players.push(msg.sender);
    }
    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,now,players)));
    } 
    function pickWinner() payable public restricted{
        uint index = random()%players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }
    function getAllPlayers() public view returns ( address[] memory){
        return players;
    }
    function getContractBal() public view returns(uint){
            return address(this).balance;
    }
    
}