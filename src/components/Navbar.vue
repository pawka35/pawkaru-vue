<template>
<div>
  <v-navigation-drawer app temporary class="elevation-8" v-model="sideNav">
     <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
          <v-list-item-subtitle>
            &nbsp;
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="sideNav=!sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Pawka.ru</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
      v-for="item in items"
      :key="item.title"
      :to="item.url"
      >
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-app-bar>
</div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      items: [
        { title: 'Main', icon: 'mdi-home', url: '/' },
        { title: 'Radio', icon: 'mdi-radio', url: '/radio' },
        { title: 'Snake', icon: 'mdi-snake', url: '/snake' }
      ],
      right: null
    }
  }
}

</script>
