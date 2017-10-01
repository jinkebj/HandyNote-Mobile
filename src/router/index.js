import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Recents from '@/views/Recents'
import Folders from '@/views/Folders'
import Favorites from '@/views/Favorites'
import Settings from '@/views/Settings'

import NoteDetail from '@/components/NoteDetail'
import FolderDetail from '@/components/FolderDetail'

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
      component: FolderDetail
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
      component: NoteDetail
    },
    {
      path: '*',
      redirect: '/recents'
    }
  ]
})
