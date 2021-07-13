<template>
    <div>
        <div v-if="!getApi" class="progressCircle">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
        </div>
        <div style="overflow-x: scroll; width: 80%; margin: 0 auto;" v-else>
            <template v-for="(item, id) in chart">
                <div class="chartWrapper" :key="id">
                    <line-chart :style="getStyle(item)" :chart-data="item" :options="complexChartOption" :styles="myStyles"></line-chart>
                </div>
            </template>
            
        </div>
    </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
    components: {
      LineChart
    },
    props: ['dataNumber'],
    data() {
        return {
            getApi: false,
            graphTemplateData: {
                label: '',
                data: [],
                fill: true,
                backgroundColor: '',
                borderColor: '',
                type: '',
                yAxisID: ''
            },
            barChartData: {
                labels: [],
                datasets: []
            },
            chart: [],
            complexChartOption: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        id: "y-axis-1",
                        type: "linear",
                        position: "left",
                        gridLines: {
                            display: true,
                            color: '#aaa',
                            borderDash: [3, 1]
                        },
                        stacked: true
                    }]
                },
                gridLines: true,
                onClick: this.handle
            },
            graphColor: '',
        }
    },
    computed: {
        myStyles(){
            return{
                height: "360px"
            }
        },
        getTotalTagDatas(){
            let tagstring = ''
            const chips = this.$store.state.chips[this.dataNumber]
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
            let tagstring = ''
            const chips = this.$store.state.chips[this.dataNumber]
            if (chips.length == 0) {
                return
            }
            for (let i = 0, length = chips.length; i < length; i++){
                if (i === (length - 1)) {
                    tagstring += chips[i]
                } else {
                    tagstring += chips[i] + ' and '
                }
            }  
            return tagstring
        },
    },
    async created() {
        this.getApi = true
    },
    mounted() {
        this.$store.watch((state, getters) => getters.getChips[this.dataNumber],
            async () => {
                await this.getGraphData('dates')
                this.getApi = true
            },
        )
    }, 
    methods: {
        handle(point, event){
            const item = event[0]
            if(item != undefined){
                this.$store.commit('setTopic', {val: item._chart.config.data.datasets[0].label, index:this.dataNumber})
                this.$store.commit('setGraphPointLabel', item._chart.config.data.labels[item._index])
            }
        },
        getLabels(val){
            const array = []
            for(const element of val){
                array.push(element['date'])
            }
            return array;
        },
        getStyle(val){
            const xAxisStepSize = 10
            const chartWidth = val.datasets[0].data.length * xAxisStepSize
            return "width:" + chartWidth + "px; min-width: 100%;"
        },
        getrandomColor(){
            this.graphColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" ;
        },
        makeGraphTemplateData(label, backgroundColor, fill, data, borderColor, type, yAxisID){
            const graph = JSON.parse(JSON.stringify(this.graphTemplateData))
            graph.label = label
            graph.data = data
            graph.fill = fill
            graph.backgroundColor = backgroundColor
            graph.borderColor = borderColor
            graph.type = type
            graph.yAxisID = yAxisID
            return graph
        },
        makeGraphData(val) {
            const count = []
            for(const elem of val){
                count.push(elem.count)
            }
            return count
        },
        getUrl (...args) {
            const result = args.join('/')
            return result
        },
        async getGraphData(val) {
            this.chart = []
            this.getApi = false
            let ChartData = JSON.parse(JSON.stringify(this.barChartData))
            if(this.$store.state.chips[this.dataNumber].length !== 0){
                Promise.all([
                    this.axios
                    .get(encodeURI(this.getUrl('https://mongo-fastapi01.herokuapp.com/api/count-hashtags', val, this.getTotalTagDatas))),
                    this.axios
                    .get(encodeURI(this.getUrl('https://mongo-fastapi01.herokuapp.com/api/count-retweets', val, this.getTotalTagDatas)))
                ])
                .then((responses) => {
                    ChartData = JSON.parse(JSON.stringify(this.barChartData))
                    ChartData.labels = this.getLabels(responses[0].data)
                    ChartData.datasets.push(this.makeGraphTemplateData(this.getTotalTagTitle, '#14FED4', false, this.makeGraphData(responses[0].data), '#14FED4', 'bar', 'y-axis-1'))
                    ChartData.datasets.push(this.makeGraphTemplateData("totalRetweet", '#EC2', false, this.makeGraphData(responses[1].data), '#EC2', 'bar', 'y-axis-1'))
                    this.chart.push(ChartData)
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        },
    }
}
</script>

<style scoped>
    .progressCircle{
        text-align: center;
    }
</style>