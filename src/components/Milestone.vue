<template>
    <div class="oath-milestones">

        <!-- Add milestone to oath -->
        <form class="milestoneMaker" @submit.prevent="addMilestoneToOath" v-show="toggleCreateMilestone">
            <h2>New Milestone</h2>
            <div>
                <input type="text" v-model="milestoneOathId" placeholder="Oath Id" disabled>
            </div>
            <br>
            <div>
                <input type="text" placeholder="Body" v-model="milestoneBody">
            </div>
            <br>
            <div>
                <input type="number" placeholder="Minimum Confirmations" v-model="milestoneConfirmations">
                <input type="datetime-local" placeholder="Deadline" v-model="milestoneDeadline">
            </div>
            <br>
            <div>
                <input type="number" placeholder="Ether Value" v-model="milestoneValue">
                <button @click.prevent="addMilestoneToOath">Submit</button>
            </div>
        </form>

        <div>
            <span>
                Milestone(s) {{oathMilestoneCount}}
                <button style="text-align: right" @click="toggleCreateMilestoneMethod(oathId)"> Add Milestone + </button>
            </span>

            <span class="toggleMilestone" style="float: right" @click="toggleMilestoneMethod(oathId, oathMilestoneCount)">
                toggle
            </span>
        </div>
        <hr>
        <div class="notice">
                {{notice}}
            </div>
        <table class="milestone-table" v-show="toggleMilestones">
            <thead>
                <th>Complete</th>
                <th>Body</th>
                <th>Deadline</th>
                <th>Value</th>
                <th>Oath Giver Verified</th>
                <th>Oath Taker Verified</th>
            </thead>
            <tbody v-for="(milestone, index) in milestones" :key="index">
                <tr>
                    <td>
                        <input type="checkbox" id="complete" @click="toggleComplete(oathId, index, oathGiver, oathTaker)" v-model="milestone.completed" true-value="true" false-value="false">
                    </td>
                    <td>
                        <span>{{milestone.milestoneBody}}</span>
                    </td>
                    <td>
                        <span>{{new Date(milestone.milestoneDeadline * 1000).toUTCString()}}</span>
                    </td>
                    <td>
                        <span>{{ milestone.milestoneValue / 1000000000000000000}} eth</span>
                    </td>
                    <td>
                        <span>{{milestone.oathGiverVerified }}</span>
                    </td>
                    <td>
                        <span>{{milestone.oathTakerVerified }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Milestone',
    props: ['oathMilestoneCount', 'oathId', 'oathGiver', 'oathTaker', 'contract', 'address', 'web3'],
    data(){
        return{
            toggleCreateMilestone: false,
            toggleMilestones: false,
            milestones: [],
            notice: '',
            milestoneOathId: '',
            milestoneBody: '',
            milestoneConfirmations: '',
            milestoneDeadline: '',
            milestoneValue: '',
        }
    },
    methods: {
        async addMilestoneToOath(){
            let date = new Date(this.milestoneDeadline).getTime();
            let deadline = date / 1000;
            await this.contract.methods.addMilestoneToOath(
                this.milestoneOathId,
                this.milestoneBody,
                this.milestoneConfirmations,
                deadline,
            ).send({from: this.address, value: this.web3.utils.toWei(this.milestoneValue, "ether")});
        },
        toggleCreateMilestoneMethod(_oathId){
            this.milestoneOathId = _oathId;
            this.toggleCreateMilestone = !this.toggleCreateMilestone;
        },
        async toggleMilestoneMethod(_oathId, _totalMilestones){
            this.toggleMilestones = !this.toggleMilestones;
            if(this.toggleMilestones == true){
                return await this.getMilestones(_oathId, _totalMilestones);
            }
        },
        async getMilestones(_oathId, _totalMilestones){
            console.log(_oathId, _totalMilestones);
            for (let i = 0; i < _totalMilestones; i++) {
                // console.log(await contract.methods.milestones(_oathId, i).call());
                if(this.milestones.length < _totalMilestones){
                    this.milestones.push(await this.contract.methods.milestones(_oathId, i).call());
                }
            }
        },
        toggleComplete(_oathId, _milestoneId, _oathGiver, _oathTaker){
            console.log(_oathId, _milestoneId, _oathGiver, _oathTaker)
            if(this.address == _oathGiver.toLowerCase()){
                this.giverMarkAsDone(_oathId, _milestoneId);
            }else if(this.address == _oathTaker.toLowerCase()){
                this.takerMarkAsDone(_oathId, _milestoneId);
            }else{
                this.notice = `Only oath-giver, oath-taker or oath-verifier can complete a milestone`;
            }
        },
        async giverMarkAsDone(_oathId, _milestoneId){
            await this.contract.methods.oathGiverMarkMilestoneAsDone(_oathId, _milestoneId).send({from: this.address});
        },
        async takerMarkAsDone(_oathId, _milestoneId){
            await this.contract.methods.oathGiverMarkMilestoneAsDone(_oathId, _milestoneId).send({from: this.address});
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .milestoneMaker{
        width: 89%;
        text-align: center;
        border: 2px dashed black;
        margin: 20px 0;
        padding: 40px;
    }
    .notice{
        background-color: hsla(180,52%,52%,1);
        color: rgb(204, 35, 35);
        padding: 10px;
        font-weight: bold;
        border: 3px solid gainsboro;
        border-radius: 5px;
        text-align: center;
    }
</style>
