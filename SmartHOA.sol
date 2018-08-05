pragma solidity ^0.4.17;

contract HOA{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    address public manager; // the one who starts this campaign
    uint public minContribution; // homeowner's min contribution to this campaign
    uint public maxContribution; // max contribution
    address[] public approvers;
    Request[] public requests;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function HOA(uint lower, uint upper) public{
        manager = msg.sender;
        minContribution = lower;
        maxContribution = upper;
    }
    
    function contribute() public payable{
        require(msg.value >= minContribution);
        require(msg.value <= maxContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest(string desc, uint value, address recip) public restricted{
        Request newRequest = Request({
            description: desc,
            value: value,
            recipient: recip,
            complete: false
        });
        requests.push(newRequest);
    }
}
