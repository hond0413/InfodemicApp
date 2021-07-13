<template>
    <div>
        <div v-if="!getApi" class="progressCircle">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
        </div>
        <div v-else>
            <h3 class="header">
                {{this.$store.state.topic[dataNumber]}}
                <div style="font-weight: lighter; font-size: smaller; width: fit-content; margin: 0 5% 0 auto; color: '#aaa';">
                    {{this.$store.state.graphPointLabel[dataNumber]}}
                </div>
            </h3>
            <div class="topicHr">
                <hr>
            </div>
            <div v-for="(item, i) in allTweetData.slice(getPageStart(pageNm), getPageEnd(pageNm))" :key="i" class="tweetList">
                <TweetCard :id="item.id" v-if="item.id" error-message="" :options="{ 'conversation': 'none' }"/>
            </div>
            <v-pagination v-model="pageNm" :length="getPageLength" color="#AAAAAA" style="text-color"></v-pagination>
        </div>
    </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed';

export default {
    components: {
        TweetCard: Tweet
    },
    props: ['dataNumber'],
    data:() => ({
        topic: 'Covid-19',
        allTweetData: [],
        month: 0,
        pageNm: 1,
        getApi: false,
    }),
    computed: {
        getTotalTagDatas(){
            const chips = this.$store.state.chips[this.dataNumber]
            let tagstring = ''
            if (chips.length == 0) {
                return
            }
            for (let i = 0, length = chips.length; i < length; i++){
                if (i === (length - 1)) {
                    tagstring += chips[i]
                } else {
                    tagstring += chips[i] + '&'
                }
            }  
            return tagstring
        },
        getTotalTagTitle(){
            const chips = this.$store.state.chips[this.dataNumber]
            let tagstring = ''
            if (chips.length == 0) {
                return
            }
            for (let i = 0, length = chips.length; i < length; i++){
                if (i === (length - 1)) {
                    tagstring += chips[i]
                } else {
                    tagstring += chips[i] + ','
                }
            }  
            return [tagstring]
        },
        getPageLength(){
            return Math.ceil(this.allTweetData.length / 20)
        },
    },
    async created() {
        this.getApi = true
    },
    mounted() {
        this.$store.watch((state, getters) => getters.getChips[this.dataNumber],
            () => {
                this.getTweetData()
            }
        )
        this.$store.watch((state, getters) => getters.getGraphPointLabel[this.dataNumber],
            async () => {
                this.getApi = false
                await this.axios
                .get(encodeURI(this.getUrl('https://mongo-fastapi01.herokuapp.com/api/get-tweets2', this.getTotalTagDatas + '?sdate=' + this.$store.state.graphPointLabel[this.dataNumber] + '&edate=' + this.$store.state.graphPointLabel[this.dataNumber])))
                .then((response) => {
                    this.allTweetData = response.data
                    this.getApi = true
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        )
    },
    methods:{
        async getTweetData(){
            this.getApi = false
            await this.axios
            .get(encodeURI(this.getUrl('https://mongo-fastapi01.herokuapp.com/api/get-tweets', this.getTotalTagDatas + '?sdate=20200220&edate=20200220')))
            .then((response) => {
                this.allTweetData = response.data   
                this.$store.commit('setTopic', {val: this.getTotalTagTitle, index: this.dataNumber})
                this.getApi = true
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getPageStart(val){
            return (val - 1) * 20
        },
        getPageEnd(val){
            return val * 20
        },
        getUrl (...args) {
            const result = args.join('/')
            return result
        },
    },
}
</script>

<style scoped>
    .tweet{
        position: relative;
        margin: 0 auto;
        margin-top: 60px;
        width: 90%;
        max-width: 640px;
        background-color: #242a3c;
    }
    .tweetList{
        position: relative;
        margin: 0 auto;
        width: 80%;
        max-width: 640px;
    }
    .header{
        color: white;
        position: relative;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left: 5%;
        border-left: 4px solid #ec2;
    }
    .tweetDispName{
        float: left;
        font-size: 18px;
    }
    .tweetAddress{
        color: white;
        float: left;
        font-size: 18px;
    }
    .tweetRT{
        color: white;
        position: relative;
        text-align: right;
        font-size: 18px;
    }
    .tweetText{
        color: white;
        position: relative;
        margin: 0 auto;
        width: 65%;
    }
    .topicHr{
        margin: auto;
        width: 90%;
    }
    .pageBtns{
        text-align: center;
    }
    .pageBtn{
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 15px;
    }
    hr{
        margin-bottom: 15px;
    }
    .progressCircle{
        text-align: center;
    }
</style>
