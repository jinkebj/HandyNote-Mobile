import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Recents from '@/views/Recents'
import Folders from '@/views/Folders'
import Favorites from '@/views/Favorites'
import Settings from '@/views/Settings'
import NotePage from '@/views/NotePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/recents',
      component: Recents
    },
    {
      path: '/folders',
      component: Folders
    },
    {
      path: '/favorites',
      component: Favorites
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/notes/:id',
      component: NotePage
    },
    {
      path: '*',
      redirect: '/recents'
    }
  ]
})
