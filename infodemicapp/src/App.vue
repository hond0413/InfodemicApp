<template>
  <v-app >
    <!-- <v-app-bar color="#242a3c" class="appBar" elevate-on-scroll>
      <v-app-bar-nav-icon @click="menue = !menue" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="toolbarTitle">
        Infodemic App
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="menue" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>HOME</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
    <h1 style="color: white; margin: auto;">
      Covid19 Observatory
    </h1>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    menue: false
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
.v-application{
  margin: 0 auto; 
  width: 100%;
  /* max-width: 640px; */
  background-color: #061a2b !important;
  font-family: 'Noto Sans JP', sans-serif !important; 
}
*{
  /* color: #fafafa !important; */
}
body{
  background: #061a2b;
}
.appBar{
  max-height: 56px;
}
.toolbarTitle{
  color: white;
}
</style>