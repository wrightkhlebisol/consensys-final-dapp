<template>
    <div class="page">
        <header>
            <div class="logo header-members">
                <h1 style="margin: 0">Oath-Keepr</h1>
                <p style="margin: 0">...because action speaks louder than voice</p>
            </div>
            <div class="header-members">
                <h3>Your account: {{address}}</h3>
                <button v-show="!connected || !address" @click="requestAccountAccess">Connect Account</button>
            </div>
        </header>
        <section>
        <div class="notice">
                {{notice}}
            </div>
            <div>
                <div class="body-title">
                    <h1>All Oaths : {{oathCount}}</h1>
                    <p>Contract State: {{contractState ? "Active" : "Inactive"}}</p>
                </div>

                <div class="body-title">
                    <button style="text-align: right" @click="toggleCreateOathMethod"> Create Oath + </button>
                </div>

                <div>
                    <!-- Create New Oath -->
                    <form class="milestoneMaker" v-show="toggleCreateOath" @submit.prevent="createOath">
                        <h2>New Oath</h2>
                        <div>
                            <input type="text" placeholder="Oath Title" v-model="oathTitle">
                        </div>
                        <br>
                        <div>
                            <input type="datetime-local" placeholder="Oath Deadline" v-model="oathDeadline">
                        </div>
                        <br>
                        <div>
                            <input type="text" placeholder="Recipient on Default" v-model="oathDefaultRecipient">
                        </div>
                        <br>
                        <div>
                            <input type="text" placeholder="Recipient on Completion" v-model="oathCompletionRecipient">
                        </div>
                        <br>
                        <div>
                            <button @click.prevent="createOath">Submit</button>
                        </div>
                    </form>

                </div>
            </div>

            <div class="oath" v-for="oath in oaths" :key="oath.Id">
                <div class="oath-body">
                    <div class="oath-meta">
                        <span>
                            Oath Id: {{oath.Id}}
                        </span>
                        <span class="oath-value">
                            Cummulative Oath Value: {{oath.oathValue / 1000000000000000000}} eth
                        </span>
                    </div>

                    <div class="oath-title">
                        <h3>
                            {{oath.oathGiver}} promises {{oath.oathTaker}} to {{oath.body}} in
                        <span class="toggleMilestone" @click="toggleMilestoneMethod(oath.Id, oath.milestoneCount)">
                            {{oath.milestoneCount}}
                        </span> milestones before {{new Date(oath.deadline * 1000).toUTCString()}}
                        </h3>
                    </div>

                    <div class="oath-meta-2">
                        <span>
                            Milestones Completed: {{oath.milestonesCompleted}}/{{oath.milestoneCount}}
                        </span>
                        <span class="oath-created">
                            Created: {{new Date(oath.timeCreated * 1000).toUTCString()}}
                        </span>
                    </div>

                    <div class="oath-deadline">
                        Deadline: {{new Date(oath.deadline * 1000).toUTCString()}}
                    </div>
                </div>
                <hr>
                <Milestone :oath-milestone-count="oath.milestoneCount"
                    :oath-id="oath.Id" :oath-giver="oath.oathGiver"
                    :oath-taker="oath.oathTaker" :contract="contract" :address="address" :web3="web3"></Milestone>
            </div>
        </section>
    </div>
</template>

<script>
    import Web3 from 'web3';
    let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    import {abi} from '../build/contracts/OathKeeper.json';
    import Milestone from './components/Milestone.vue';
    const contract_address = '0xA40ABb97B5b51F437212EA862554f646d1Ce638c';

    let contract = new web3.eth.Contract(abi, contract_address);


    ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        this.address = accounts[0];
        // window.location.reload();
    });

    export default {
    name: 'App',
    components: {
        Milestone
    },
    data(){
        return {
            address: "",
            toggleMilestones: false,
            toggleCreateOath: false,
            connected: false,
            oathCount: 0,
            contractState: true,
            contract,
            web3,

            oathTitle: '',
            oathDeadline: '',
            oathDefaultRecipient: '',
            oathCompletionRecipient: '',

            oathId: '',
            timeCreated: '',
            oathValue: '',
            oathGiver: '',
            useVerifiers: '',

            oaths: []
        }
    },
    methods: {
        async toggleMilestoneMethod(_oathId, _totalMilestones){
            this.toggleMilestones = !this.toggleMilestones;
            if(this.toggleMilestones == true){
                return await this.getMilestones(_oathId, _totalMilestones);
            }
        },
        toggleCreateOathMethod(){
            this.toggleCreateOath = !this.toggleCreateOath;
        },
        async requestAccountAccess(){
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    this.address = accounts[0];
                    this.connected = true;
                } catch (error) {
                    if(error.code = 4001){
                        this.address = "Oath-keepr needs an account to sign requests with";
                    }
                }
            }else{
                console.log("Oath Keeper app cannot work without a provider");
                this.address = "Oath Keeper app cannot work without a provider, kindly install Metamask"
            }
        },
        async toggleContractState(){
            console.log(await contract.methods.stopped().call());
        },
        async createOath(){
            let date = new Date(this.oathDeadline).getTime();
            let deadline = date / 1000;

            await contract.methods.createOath(
                deadline,
                this.address,
                this.oathDefaultRecipient,
                this.oathCompletionRecipient,
                this.oathTitle
            ).send({from: this.address})
        },
        async getOathCount(){
            this.oathCount = await contract.methods.getOathCount().call();
        },
        async withdrawFunds(){
            await contract.methods.withdrawFunds().send();
        },
        async getMilestones(_oathId, _totalMilestones){
            console.log(_oathId, _totalMilestones);
            for (let i = 0; i < _totalMilestones; i++) {
                // console.log(await contract.methods.milestones(_oathId, i).call());
                if(this.milestones.length < _totalMilestones){
                    this.milestones.push(await contract.methods.milestones(_oathId, i).call());
                }
            }
        },
        async getOath(_index){
            return await contract.methods.oaths(_index).call();
        },
        async checkState(){
            await contract.methods.state().call();}
    },
    watchers: {},
    async mounted(){
        // await web3.eth.getAccounts(console.log);
        await this.getOathCount();
        for (let i = 0; i < this.oathCount; i++) {
            this.oaths.push(await this.getOath(i));
            // if(i === 0) console.log(await this.getOath(i));
        }

        this.contractState = contract.methods.stopped().call();

        console.log({abi}, this.address)

    }
}
</script>

<style>
    body{
        margin: 0;
    }

    header{
        position: fixed;
        background-color: #f0f0f0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.77' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
        box-shadow: 9px 11px 20px 5px rgba(0,0,0,.2);
        padding: 18px;
        width: 100%;
    }

.milestoneMaker{
        width: 89%;
        text-align: center;
        border: 2px dashed black;
        margin: 20px 0;
        padding: 40px;
    }

    section{
        max-width: 800px;
        margin: auto;
        padding: 120px 0;
    }

    table{
        width: 100%;
        text-align: center;
    }

    input[type="text"]{
        width: 80%;
    }

    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    }

    .newRecords, .header-members{
        width: 50%;
        display: inline-block;
    }

    .toggleMilestone{
        cursor: pointer;
    }

    .oath{
        margin: 30px 0;
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.77' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(25.8) translate(-961.24 -720.93)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
        /* background by SVGBackgrounds.com */
        border: 2px solid black;
        padding: 10px;
        border-radius: 15px;

    }

    .oath-value{
        float: right;
    }

    .oath-created{
        float: right;
    }

    .oath-meta,
    .oath-meta-2,
    .oath-deadline,
    .oath-title{
        padding: 3px 0;
    }
</style>
