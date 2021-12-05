import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Radio from '@/components/Radio'
import Snake from '@/components/Snake'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/radio',
      name: 'Radio',
      component: Radio
    },
    {
      path: '/snake',
      name: 'Snake',
      component: Snake
    }
  ],
  mode: 'history'
})
