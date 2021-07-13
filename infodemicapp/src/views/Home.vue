<template>
  <div class="home">
    <v-btn @click="addColm()">
      add
    </v-btn>
    <div class="colm" style="overflow-x: auto; white-space: nowrap;">
      <template v-for="(item, id) of colNm">
        <div :key="id" style="display: inline-block; width: 640px; vertical-align: top;">
          <head-chips :data-number="item" v-if="id==0" :first-colm="true"></head-chips>
          <head-chips :data-number="item" v-else :first-colm="false"></head-chips>
          <v-btn @click="deleteCol(item)" icon>
            <v-icon color="white" large>
              mdi-close-circle-outline
            </v-icon>
          </v-btn>
          <graph :data-number="item"></graph>
          <tweet :data-number="item"></tweet>
        </div>
      </template>
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
    }
  }
}
</script>

<style scoped>
</style>
