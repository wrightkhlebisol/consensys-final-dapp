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

    let oathKeeperInstance;

    beforeEach(async () => {
        oathKeeperInstance = await OathKeeper.new();
    })

    it("should create oath with the required fields", async () => {
        const tx = await oathKeeperInstance.createOath(deadline, alice, owner, alice, body, { from: owner })

        const result = await oathKeeperInstance.oaths.call(0);

        assert.equal(result['oathGiver'], owner, 'the oath giver should be the transaction sneder')
        assert.equal(result['oathTaker'], alic, 'the oath taker should be the selected user address')
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
        const mileStoneTX = await oathKeeperInstance.addMilestoneToOath(0, 'Create test suites', 2, 2)

        const result = await 
    })

    it("should emit milestone created for oath event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("oath giver should mark milestone as done", async () => {
        const tx = await oathKeeperInstance.addMilestoneToOath()

    })

    it("should emit oath giver mark milestone as done event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit oath taker mark milestone as done event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit withdrawal made event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit confirmations complete event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should emit recipient credited event", async () => {
        let eventEmitted = false
        const tx = await oathKeeperInstance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })
})
