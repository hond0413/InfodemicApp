<template>
  <div class="home">
    <div style="overflow-x: auto; white-space: nowrap;">
      <template v-for="(item, id) of colNm">
        <div :key="id" style="display: inline-block; width: 640px; vertical-align: top;"> 
          <head-chips :data-number="item" v-if="id==0" :first-colm="true" style="display: inline-block; vertical-align: top; width: 90%;"></head-chips>
          <head-chips :data-number="item" v-else :first-colm="false" style="display: inline-block; vertical-align: top; width: 90%;"></head-chips>
          <v-btn @click="deleteCol(item)" icon style="display: inline-block; vertical-align: top; margin-top: 16px;">
            <v-icon color="white" large>
              mdi-close-circle-outline
            </v-icon>
          </v-btn>
          <graph :data-number="item" v-if="id==0" :first-colm="true"></graph>
          <graph :data-number="item" v-else :first-colm="false"></graph>
          <tweet :data-number="item"></tweet>
        </div>
      </template>
      <v-btn @click="addColm()" icon style="margin-top: 12px;">
        <v-icon color="white" large>
          mdi-plus-box-multiple-outline
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import HeadChips from '../components/headChips.vue'
import Graph from '../components/Graph.vue'
import Tweet from '../components/Tweet'

export default {
  name: 'Home',
  data() {
    return {
      colNm: [Math.random().toString(32).substring(2)],
    }
  },
  components: {
    Graph,
    Tweet,
    HeadChips,
  },
  methods: {
    addColm() {
      this.colNm.push(Math.random().toString(32).substring(2))
    },
    deleteCol(val) {
      const index = this.colNm.indexOf(val)
      this.colNm.splice(index, 1)
      this.$store.commit('deleteData', val)
      console.log(this.$store.state)
    }
  }
}
</script>

<style scoped>
</style>
