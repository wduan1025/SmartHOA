pragma solidity ^0.4.17;

contract HOAFactory{
    address[] public deployedHOAs;
    
    function createHOA(uint lower) public{
        address currentAddress = new HOA(lower, msg.sender);
        deployedHOAs.push(currentAddress);
    }
    
    function getDeployedHOA() public view returns(address[]) {
        return deployedHOAs;
    }
}
contract HOA{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    address public manager; // the one who starts this campaign
    uint public minContribution; // homeowner's min contribution to this campaign
    Request[] public requests;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function HOA(uint lower, address creator) public{
        manager = creator;
        minContribution = lower;
    }
    
    function contribute() public payable{
        require(msg.value >= minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string desc, uint value, address recip) public restricted{
        Request memory newRequest = Request({
            description: desc,
            value: value,
            recipient: recip,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage currentRequest = requests[index];
        require(approvers[msg.sender]);
        require(!currentRequest.approvals[msg.sender]);
        currentRequest.approvals[msg.sender] = true;
        currentRequest.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage currentRequest = requests[index];
        require(!currentRequest.complete);
        require(currentRequest.approvalCount > (approversCount /2));
        currentRequest.recipient.transfer(currentRequest.value);
        currentRequest.complete = true;
    }

    function getSummary() public view returns (
        uint, uint ,uint, uint, address) {
        return (
            minContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }
    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}
