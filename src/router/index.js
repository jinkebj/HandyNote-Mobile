import Vue from 'vue'
import Router from 'vue-router'
import RecentList from '@/components/RecentList'
import FolderList from '@/components/FolderList'
import FavoriteList from '@/components/FavoriteList'
import SettingPage from '@/components/SettingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recents'
    },
    {
      path: '/recents',
      name: 'RecentList',
      component: RecentList
    },
    {
      path: '/folders',
      name: 'FolderList',
      component: FolderList
    },
    {
      path: '/settings',
      name: 'SettingPage',
      component: SettingPage
    },
    {
      path: '/favorites',
      name: 'FavoriteList',
      component: FavoriteList
    }
  ]
})
