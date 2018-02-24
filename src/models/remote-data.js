import http from 'axios'
import {HANDYNOTE_SERVICE_API} from '@/../config'

const RemoteData = {}
const BaseAPIUrl = process.env.HANDYNOTE_SERVICE_API || HANDYNOTE_SERVICE_API

RemoteData.getPublicUrl = () => {
  return BaseAPIUrl + '/public'
}

RemoteData.getHttpPrototype = () => {
  return http
}

RemoteData.login = (params) => {
  return http.post(BaseAPIUrl + '/tokens/', params)
}

RemoteData.getNoteList = (params) => {
  return http.get(BaseAPIUrl + '/notes', { params: params })
}

RemoteData.addNote = (params) => {
  return http.post(BaseAPIUrl + '/notes/', params)
}

RemoteData.getNote = (id) => {
  return http.get(BaseAPIUrl + '/notes/' + id)
}

RemoteData.updateNote = (id, params) => {
  return http.post(BaseAPIUrl + '/notes/' + id, params)
}

RemoteData.deleteNote = (id) => {
  return http.delete(BaseAPIUrl + '/notes/' + id)
}

RemoteData.getFolderTreeData = (params) => {
  return http.get(BaseAPIUrl + '/folders/tree-info', { params: params })
}

RemoteData.getFolderList = (params) => {
  return http.get(BaseAPIUrl + '/folders', { params: params })
}

RemoteData.addFolder = (params) => {
  return http.post(BaseAPIUrl + '/folders/', params)
}

RemoteData.getFolder = (id) => {
  return http.get(BaseAPIUrl + '/folders/' + id)
}

RemoteData.updateFolder = (id, params) => {
  return http.post(BaseAPIUrl + '/folders/' + id, params)
}

RemoteData.deleteFolder = (id) => {
  return http.delete(BaseAPIUrl + '/folders/' + id)
}

RemoteData.getTrash = () => {
  return http.get(BaseAPIUrl + '/trash')
}

RemoteData.emptyTrash = () => {
  return http.post(BaseAPIUrl + '/trash/empty')
}

RemoteData.revertTrash = () => {
  return http.post(BaseAPIUrl + '/trash/revert')
}

RemoteData.deleteTrash = (id) => {
  return http.delete(BaseAPIUrl + '/trash/' + id)
}

RemoteData.restoreTrash = (id) => {
  return http.post(BaseAPIUrl + '/trash/' + id + '/restore')
}

export default RemoteData
