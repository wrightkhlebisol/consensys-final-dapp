let BN = web3.utils.BN;
let OathKeeper = artifacts.require("./OathKeeper.sol");
let catchRevert = require('./exceptionsHelpers.js').catchRevert

contract("OathKeeper", function (accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    const deadline = 10
    const milestoneDeadline = 2
    const body = "Complete tests and deploy"
    const oathId = 0
    const milestoneBody = 'Create test suites'
    const confirmations = 2

    let oathKeeperInstance;

    beforeEach(async () => {
        oathKeeperInstance = await OathKeeper.new();
    })

    it("should create oath with the required fields", async () => {
        await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })

        const result = await oathKeeperInstance.oaths.call(0);

        assert.equal(result['oathGiver'], owner, 'the oath giver should be the transaction sneder')
        assert.equal(result['oathTaker'], alice, 'the oath taker should be the selected user address')
        assert.equal(result['defaultsRecipient'], owner, 'oath creator should be assigned recipient for defaults')
        assert.equal(result['completionRecipient'], alice, 'oath taker should be assigned as the recipient for completions')
    })

    it("should emit oath created event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should add milestone to oath", async () => {
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner, value: 1 })

        const result = await oathKeeperInstance.milestones.call(0, 0);

        assert.equal(result[0], milestoneBody, 'Milestone body should equal to entered value')
        assert.equal(result[6], false, 'Oath giver verified status should be false on milestone creation')
        assert.equal(result[7], false, 'Oath taker verified status should be false on milestone creation')
        assert.equal(result[8], false, 'Milestone completion status started should be false on milestone creation')
    })

    it("should error when trying to add milestone to non-existent oath", async () => {
        await catchRevert(oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner, value: 1 }))
    })

    it("should emit milestone created for oath event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should let oath giver mark milestone as done", async () => {

    })

    it("should let oath taker mark milestone as done", async () => {

    })

    it("should emit oath giver mark milestone as done event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit oath taker mark milestone as done event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit withdrawal made event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit confirmations complete event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit recipient credited event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(oathId, milestoneBody, confirmations, milestoneDeadline, { from: owner })

        if (mileStoneTX.logs[0].event = "milestoneCreatedForOath") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })
})
