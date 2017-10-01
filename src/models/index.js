import http from 'axios'
import {HANDYNOTE_SERVICE_API} from '@/../config'

const Model = {}
const BaseAPIUrl = process.env.HANDYNOTE_SERVICE_API || HANDYNOTE_SERVICE_API

Model.getHttpPrototype = () => {
  return http
}

Model.login = (params) => {
  return http.post(BaseAPIUrl + '/tokens/', params)
}

Model.getNoteList = (params) => {
  return http.get(BaseAPIUrl + '/notes', { params: params })
}

Model.addNote = (params) => {
  return http.post(BaseAPIUrl + '/notes/', params)
}

Model.getNote = (id) => {
  return http.get(BaseAPIUrl + '/notes/' + id)
}

Model.updateNote = (id, params) => {
  return http.post(BaseAPIUrl + '/notes/' + id, params)
}

Model.deleteNote = (id) => {
  return http.delete(BaseAPIUrl + '/notes/' + id)
}

Model.getFolderList = (params) => {
  return http.get(BaseAPIUrl + '/folders', { params: params })
}

Model.addFolder = (params) => {
  return http.post(BaseAPIUrl + '/folders/', params)
}

Model.getFolder = (id) => {
  return http.get(BaseAPIUrl + '/folders/' + id)
}

Model.updateFolder = (id, params) => {
  return http.post(BaseAPIUrl + '/folders/' + id, params)
}

Model.deleteFolder = (id) => {
  return http.delete(BaseAPIUrl + '/folders/' + id)
}

Model.getTrash = () => {
  return http.get(BaseAPIUrl + '/trash')
}

Model.emptyTrash = () => {
  return http.post(BaseAPIUrl + '/trash/empty')
}

Model.revertTrash = () => {
  return http.post(BaseAPIUrl + '/trash/revert')
}

Model.deleteTrash = (id) => {
  return http.delete(BaseAPIUrl + '/trash/' + id)
}

Model.restoreTrash = (id) => {
  return http.post(BaseAPIUrl + '/trash/' + id + '/restore')
}

export default Model
