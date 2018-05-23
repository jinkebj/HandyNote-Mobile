import http from 'axios'
import {getCurBaseAPIUrl} from '@/util'

const RemoteData = {}

RemoteData.test = (baseUrl) => {
  return http.get(baseUrl + '/tests')
}

RemoteData.getStaticUrl = () => {
  return getCurBaseAPIUrl() + '/images'
}

RemoteData.getHttpPrototype = () => {
  return http
}

RemoteData.login = (params) => {
  return http.post(getCurBaseAPIUrl() + '/tokens', params)
}

RemoteData.getProfile = () => {
  return http.get(getCurBaseAPIUrl() + '/profiles')
}

RemoteData.getNotExistNoteIds = (idsStr) => {
  return http.post(getCurBaseAPIUrl() + '/notes/action',
    {
      action: 'filter_non_exist',
      ids: idsStr
    }
  )
}

RemoteData.getNoteList = (params) => {
  return http.get(getCurBaseAPIUrl() + '/notes', { params: params })
}

RemoteData.addNote = (params) => {
  return http.post(getCurBaseAPIUrl() + '/notes', params)
}

RemoteData.getNote = (id) => {
  return http.get(getCurBaseAPIUrl() + '/notes/' + id)
}

RemoteData.updateNote = (id, params) => {
  return http.post(getCurBaseAPIUrl() + '/notes/' + id, params)
}

RemoteData.deleteNote = (id) => {
  return http.delete(getCurBaseAPIUrl() + '/notes/' + id)
}

RemoteData.updateImage = (id, params) => {
  return http.post(getCurBaseAPIUrl() + '/images/' + id, params)
}

RemoteData.getNotExistFolderIds = (idsStr) => {
  return http.post(getCurBaseAPIUrl() + '/folders/action',
    {
      action: 'filter_non_exist',
      ids: idsStr
    }
  )
}

RemoteData.getFolderTreeData = (params) => {
  return http.get(getCurBaseAPIUrl() + '/folders/tree-info', { params: params })
}

RemoteData.getFolderList = (params) => {
  return http.get(getCurBaseAPIUrl() + '/folders', { params: params })
}

RemoteData.addFolder = (params) => {
  return http.post(getCurBaseAPIUrl() + '/folders', params)
}

RemoteData.getFolder = (id) => {
  return http.get(getCurBaseAPIUrl() + '/folders/' + id)
}

RemoteData.updateFolder = (id, params) => {
  return http.post(getCurBaseAPIUrl() + '/folders/' + id, params)
}

RemoteData.deleteFolder = (id) => {
  return http.delete(getCurBaseAPIUrl() + '/folders/' + id)
}

RemoteData.getTrash = () => {
  return http.get(getCurBaseAPIUrl() + '/trash')
}

RemoteData.emptyTrash = () => {
  return http.post(getCurBaseAPIUrl() + '/trash/empty')
}

RemoteData.revertTrash = () => {
  return http.post(getCurBaseAPIUrl() + '/trash/revert')
}

RemoteData.deleteTrash = (id) => {
  return http.delete(getCurBaseAPIUrl() + '/trash/' + id)
}

RemoteData.restoreTrash = (id) => {
  return http.post(getCurBaseAPIUrl() + '/trash/' + id + '/restore')
}

export default RemoteData
