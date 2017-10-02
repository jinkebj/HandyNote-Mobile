import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Recents from '@/views/Recents'
import Folders from '@/views/Folders'
import Favorites from '@/views/Favorites'
import Settings from '@/views/Settings'

import NoteDetail from '@/components/NoteDetail'
import FolderDetail from '@/components/FolderDetail'
import TrashList from '@/components/TrashList'
import FolderSelect from '@/components/FolderSelect'

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
      path: '/folders/:id',
      component: FolderDetail,
      props: true
    },
    {
      path: '/folders',
      component: Folders
    },
    {
      path: '/folder-select',
      component: FolderSelect,
      props: (route) => ({srcType: route.query.srcType, srcId: route.query.srcId})
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
      component: NoteDetail,
      props: true
    },
    {
      path: '/trash',
      component: TrashList
    },
    {
      path: '*',
      redirect: '/recents'
    }
  ]
})
