<template>
    <div class="page">
        <header>
            <div class="logo header-members">
                <h1 style="margin: 0">Oath-Keepr</h1>
                <p style="margin: 0">...because action speaks louder than voice</p>
            </div>
            <h3 class="address header-members">{{address}}</h3>
        </header>
        <section>
            <div>
                <div class="body-title">
                    <h1>All Oaths</h1>
                </div>

                <div class="body-title">
                    <button style="text-align: right" @click="toggleCreateOathMethod"> Create Oath + </button>
                </div>

                <div>
                    <!-- Create New Oath -->
                    <form class="newRecords" v-show="toggleCreateOath">
                        <h2>New Oath</h2>
                        <div>
                            <input type="text" name="oath-title" placeholder="Oath Title" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Oath Deadline" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Required no of Confirmations" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Recipient on Default" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Recipient on Completion" id="oath-title">
                        </div>
                    </form>

                    <!-- Add milestone to oath -->
                    <form class="newRecords"  v-show="toggleCreateMilestone">
                        <h2>New Milestone</h2>
                        <div>
                            <input type="text" name="oath-title" placeholder="Oath Id" id="oath-id" disabled>
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Milestone Body" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Milestone Deadline" id="oath-title">
                        </div>
                        <br>
                        <div>
                            <input type="text" name="oath-title" placeholder="Milestone Value" id="oath-title">
                        </div>
                    </form>
                </div>
            </div>

            <div class="oath" v-for="oath in oaths" :key="oath.oathId">
                <div class="oath-body">
                    <div class="oath-meta">
                        <span>
                            Oath Id: {{oath.oathId}}
                        </span>
                        <span class="oath-value">
                            Cummulative Oath Value: {{oath.oathValue}} eth
                        </span>
                    </div>

                    <div class="oath-title">
                        <h3>
                            Oath-giver promises Oath-taker to do
                        <span class="toggleMilestone" @click="toggleMilestoneMethod">
                            {{milestones.length}}
                        </span> things before {{oath.oathDeadline}} days
                        </h3>
                    </div>

                    <div class="oath-meta-2">
                        <span>
                            Milestones Completed: {{oath.milestonesCompleted}}
                        </span>
                        <span class="oath-created">
                            Created: {{new Date().toUTCString()}}
                        </span>
                    </div>

                    <div class="oath-deadline">
                        Deadline: {{oath.oathDeadline}} days
                    </div>
                <div class="body-title">
                    <button style="text-align: right" @click="toggleCreateMilestoneMethod"> Add Milestone + </button>
                </div>
                </div>

                <hr>
                <div class="oath-milestones">
                    <div>
                        <span>
                            Milestone(s) {{milestones.length}}
                        </span>

                        <span class="toggleMilestone" style="float: right" @click="toggleMilestoneMethod">
                            toggle
                        </span>
                    </div>
                    <hr>
                    <table class="milestone-table" v-show="toggleMilestones">
                        <thead>
                            <th>Complete</th>
                            <th>Body</th>
                            <th>Deadline</th>
                            <th>Value</th>
                            <th>Confirmations</th>
                        </thead>
                        <tbody v-for="milestone in milestones" :key="milestone.id">
                            <tr>
                                <td>
                                    <input type="checkbox" name="complete" id="complete">
                                </td>
                                <td>
                                    <span>{{milestone.body}}</span>
                                </td>
                                <td>
                                    <span>{{milestone.milestoneDeadline}} days</span>
                                </td>
                                <td>
                                    <span>{{milestone.milestoneValue}} eth</span>
                                </td>
                                <td>
                                    <span>{{milestone.confirmations}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Web3 from 'web3';

    // let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"));

    // let accounts = web3.eth.getAccounts().then((res) => {
    //     console.log(res);
    // }).catch(err => console.log(err))


    export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data(){
        return {
            address: "",
            toggleMilestones: true,
            toggleCreateOath: false,
            toggleCreateMilestone: false,
            oaths: [{
                oathId: 1441,
                oathValue: 86,
                milestonesCompleted: 3,
                requiredConfirmations: 3,
                oathDeadline: 37,
                created: "23-10-2020"
            },{
                oathId: 1442,
                oathValue: 86,
                milestonesCompleted: 3,
                requiredConfirmations: 3,
                oathDeadline: 37,
                created: "23-10-2020"
            }],
            milestones: [{
                confirmed: false,
                body: "Milestone body 1",
                milestoneDeadline: 25,
                milestoneValue: 17,
                confirmations: 3

            }, {
                confirmed: true,
                body: "Milestone body 2",
                milestoneDeadline: 29,
                milestoneValue: 45,
                confirmations: 2

            }, {
                confirmed: false,
                body: "Milestone body 3",
                milestoneDeadline: 34,
                milestoneValue: 34,
                confirmations: 1

            },{
                confirmed: true,
                body: "Milestone body 2",
                milestoneDeadline: 29,
                milestoneValue: 45,
                confirmations: 0

            }, {
                confirmed: false,
                body: "Milestone body 3",
                milestoneDeadline: 34,
                milestoneValue: 34,
                confirmations: 0

            }],
        }
    },
    methods: {
        toggleMilestoneMethod(){
            this.toggleMilestones = !this.toggleMilestones;
        },
        toggleCreateOathMethod(){
            this.toggleCreateOath = !this.toggleCreateOath;
        },
        toggleCreateMilestoneMethod(){
            this.toggleCreateMilestone = !this.toggleCreateMilestone;
        }
    },
    async mounted(){
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            this.address = accounts[0];
        }else{
            console.log("Oath Keeper app cannot work without a provider");
            this.address = "Oath Keeper app cannot work without a provider"
        }
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

    .newRecords{
        width: 50%;
        display: inline-block;
    }

    .toggleMilestone{
        cursor: pointer;
    }

    .header-members, .body-title{
        width: 50%;
        display: inline-block;
    }

    .address {
        float: right;
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
