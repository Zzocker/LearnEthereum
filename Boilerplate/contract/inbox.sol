pragma solidity ^0.6.0;
contract Inboc {

    string public message;
    constructor(string memory initMesg) public{
        message = initMesg;
    }
    function setMessage(string memory newmsg) public{
        message = newmsg;
    }

}