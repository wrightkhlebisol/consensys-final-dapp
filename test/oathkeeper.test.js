let BN = web3.utils.BN;
let OathKeeper = artifacts.require("./OathKeeper.sol");
let catchRevert = require('./exceptionsHelpers.js').catchRevert

contract("OathKeeper", function (accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    const deadline = 10
    const body = "Complete test"

    let oathKeeperInstance;

    beforeEach(async () => {
        oathKeeperInstance = await OathKeeper.new();
    })

    it("should create oath with the required fields", async () => {
        const tx = await oathKeeperInstance.createOath()

    })

    it("should emit oath created event", async () => {
        let eventEmitted = false
        const tx = await instance.addItem(name, price, { from: alice })

        if (tx.logs[0].event = "oathCreated") {
            eventEmitted = true;
        }

        assert.equal(eventEmitted, true, 'creating oath should emit an Oath Created event')
    })

    it("should add milestone to oath", async () => {
        const tx = await oathKeeperInstance.addMilestoneToOath()
    })

    it("should emit milestone created for oath event", async () => {
        let eventEmitted = false
        const tx = await instance.addItem(name, price, { from: alice })

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
