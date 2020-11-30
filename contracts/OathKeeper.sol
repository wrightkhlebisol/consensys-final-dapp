// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.8.0;

/// @title OathKeeper contract
/// @author Ogundiya O. Caleb
/// @notice This contract gives you the ability to create oaths and its milestone and also manage withdrawals
/// @dev All function calls are currently implemented without side effects

contract OathKeeper{
    uint private oathCount = 0;
    
    mapping (address => uint) public pendingWithdrawals;
    
    mapping(uint => Oath) public oaths;
    
    struct Oath {
        uint Id;
        string body;
        uint timeCreated;
        uint deadline;
        uint oathValue;
        address oathGiver;
        address oathTaker;
        address payable defaultsRecipient;
        address payable completionRecipient;
        bool useVerifiers;
    }
    
    mapping(uint => Milestone[]) public milestones;
    
    struct Milestone {
        // oathId acts as foreignkey to link milestone to oath
        string milestoneBody;
        uint8 confirmations;
        uint8 confirmationsSoFar;
        uint milestoneValue;
        uint milestoneCreated;
        uint milestoneDeadline;
        bool oathGiverVerified;
        bool oathTakerVerified;
        bool completed;
    }
    
    /**
     * MODIFIERS
    */
    modifier onlyOathTaker(){
        _;
    }
    
    modifier onlyOathGiver(){
        _;
    }
    
    modifier oathExists(){
        _;
    }
    
    modifier milestoneExists(){
        _;
    }
    
    modifier senderHasPendingWithdrawals(){
        _;
    }
    
    
    
    /**
     * EVENTS
    */
    event oathCreated(uint indexed oathid);
    
    event milestoneCreatedForOath(uint indexed oathId);
    
    event oathGiverMarkMilestone(address oathGiver, uint indexed oathid, uint indexed milestoneId);
    
    event oathTakerMarkMilestone(address oathTaker, uint indexed oathid, uint indexed milestoneId);
    
    event withdrawalMade(address indexed recipient, uint indexed amount);
    
    event confirmationsComplete(uint indexed milestoneId);
    
    event recipientCredited(address recipient, uint amount);
    
    
    /// @notice create oath
    /// @param _deadline When oath expires
    /// @param _oathTaker (required) user who can mark milestone as done
    /// @param _defaultsRecipient (required) address to pay when milestone is missed
    /// @param _completionRecipient (required) address to pay when milestone is crushed
    /// @param _body some description of the milestone
    /// @return _oathId 
    function createOath(
        uint _deadline, 
        address payable _oathTaker, 
        address payable _defaultsRecipient,
        address payable _completionRecipient,
        string memory _body
    ) 
    public returns (uint _oathId)
    {
        _oathId = oathCount++;
        Oath memory newoath = Oath(
            _oathId, 
            _body, 
            block.timestamp, 
            block.timestamp + _deadline,
            0,
            msg.sender, 
            _oathTaker, 
            _defaultsRecipient, 
            _completionRecipient, 
            false
        );
        oaths[_oathId] = newoath;
        emit oathCreated(_oathId);
    }
    
    /// @notice 
    /// @dev 
    /// @return oathCount 
    function getOathCount() public view returns (uint){
        return oathCount;
    }
    
    /// @notice Add milestone to existing oath
    /// @param _oathId The id of oath to add milestone
    /// @return updatedOathId 
    function addMilestoneToOath(
        uint _oathId,
        string memory _milestoneBody,
        uint8 _confirmations,
        uint _milestoneValue,
        uint _milestoneDeadline
    ) 
    public payable returns (uint)
    {
        Milestone memory milestone = Milestone(
            _milestoneBody, 
            _confirmations,
            0,
            _milestoneValue, 
            block.timestamp, 
            block.timestamp + _milestoneDeadline, 
            false, 
            false,
            false
        );
        milestones[_oathId].push(milestone);
        oaths[_oathId].oathValue += _milestoneValue;
        emit milestoneCreatedForOath(_oathId);
        return _oathId;
    }
    
    /// @notice
    /// @dev 
    /// @param _oathId The id of oath to add milestone
    /// @return _oathId, _milestoneId
    function oathGiverMarkMilestoneAsDone(uint _oathId, uint _milestoneId) public
        returns (uint, uint) 
    {
        // Milestone memory milestone = milestones[_oathId][_milestoneId];
        milestones[_oathId][_milestoneId].confirmationsSoFar++;
        milestones[_oathId][_milestoneId].oathGiverVerified = true;
        if(milestones[_oathId][_milestoneId].confirmationsSoFar == milestones[_oathId][_milestoneId].confirmations){
            // Give ether value to success recipient
            milestones[_oathId][_milestoneId].completed = true;
            pendingWithdrawals[oaths[_oathId].completionRecipient] += milestones[_oathId][_milestoneId].milestoneValue;
            emit confirmationsComplete(_milestoneId);
            emit recipientCredited(oaths[_oathId].completionRecipient, milestones[_oathId][_milestoneId].milestoneValue);
        }
        emit oathGiverMarkMilestone(msg.sender, _oathId, _milestoneId);
        return(_oathId, _milestoneId);
    }
    
    /// @notice 
    /// @dev 
    /// @param _oathId The id of oath to add milestone
    /// @return _oathId, _milestoneId
    function oathTakerMarkMilestoneAsDone(uint _oathId, uint _milestoneId) public 
        returns (uint, uint) 
    {
        Milestone storage milestone = milestones[_oathId][_milestoneId];
        milestone.confirmationsSoFar++;
        milestone.oathTakerVerified = true;
        if(milestone.confirmationsSoFar == milestone.confirmations){
            // Give ether value to success recipient
            milestone.completed = true;
            pendingWithdrawals[oaths[_oathId].completionRecipient] += milestone.milestoneValue;
            emit confirmationsComplete(_milestoneId);
            emit recipientCredited(oaths[_oathId].completionRecipient, milestone.milestoneValue);
        }
        emit oathTakerMarkMilestone(msg.sender, _oathId, _milestoneId);
        return(_oathId, _milestoneId);
    }
    
    /// @notice 
    /// @dev 
    /// @return 
    function withdrawFunds() public {
        uint amount = pendingWithdrawals[msg.sender];
        // Avoid re-entrancy by zeroing amount before sending;
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
        emit withdrawalMade(msg.sender, amount);
    }
    
    /// @notice Fallback function
    function() external payable{
        return;
    }
    
    // function oathVerifierMarkMilestoneAsDone(uint _oathId) public returns (uint) {
    //     milestones[_oathId].confirmations++;
    //     milestones[_oathId].oathGiverVerified = true;
    // }
 
}
