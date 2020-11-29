// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.8.0;


contract OathKeeper{

    mapping(uint => Oath) totalOath;

    int oathCount = 0;

    struct Oath {
        uint oathId;
        string body;
        bytes totalValue;
        bytes timeCreated;
        bytes deadline;
        mapping(address => bool) notaryPublic;
        address oathGiver;
        address oathTaker;
        int8 confirmations;
        bool useVerifiers;
    }

    struct MileStone {
        uint oathId;

    }

    function createOath() public{}

    function mileStone() public {}

    function oathGiverMarkMilestoneAsDone() public returns (uint) {}

    function oathTakerMarkMilestoneAsDone() public returns (uint) {}

    function oathVerifierMarkMilestoneAsDone() public returns (uint) {}

}
