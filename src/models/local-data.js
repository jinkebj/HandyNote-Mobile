import http from 'axios'
import {HANDYNOTE_SERVICE_API} from '@/../config'
import Dexie from 'dexie'
import {prepareFolderData} from '@/util'

const LocalData = {}
const BaseAPIUrl = process.env.HANDYNOTE_SERVICE_API || HANDYNOTE_SERVICE_API

const db = new Dexie('HandyNote')

// define local db schema
db.version(1).stores({
  notes: '&_id, name, digest, *folder_id, folder_name, starred, deleted, updated_at',
  notesDetails: '&_id, name, text, contents, *folder_id, starred, deleted, owner, folder_name, digest, created_at, updated_at',
  folders: '&_id, name, parent_id, ancestor_ids, deleted, updated_at'
})

LocalData.clear = async () => {
  await db.notes.clear()
  await db.notesDetails.clear()
  await db.folders.clear()
}

LocalData.addNoteDataBatch = async (notesData) => {
  for (let noteData of notesData) {
    await db.notes.put(noteData)
  }
}

LocalData.addNoteDetailDataBatch = async (notesData) => {
  for (let noteData of notesData) {
    noteData.contents = JSON.stringify(noteData.contents)
    await db.notesDetails.put(noteData)
  }
}

LocalData.addFolderDataBatch = async (foldersData) => {
  for (let folderData of foldersData) {
    await db.folders.put(folderData)
  }
}

LocalData.getNoteList = async (params) => {
  let retData
  if (JSON.stringify(params) === JSON.stringify({})) {
    retData = await db.notes.toCollection().reverse().sortBy('updated_at')
  } else {
    retData = await db.notes.where(params).reverse().sortBy('updated_at')
  }
  return { data: retData }
}

LocalData.addNote = (params) => {
  return http.post(BaseAPIUrl + '/notes/', params)
}

LocalData.getNote = async (id) => {
  let retData = await db.notesDetails.get(id)
  return { data: retData }
}

LocalData.updateNote = (id, params) => {
  return http.post(BaseAPIUrl + '/notes/' + id, params)
}

LocalData.deleteNote = (id) => {
  return http.delete(BaseAPIUrl + '/notes/' + id)
}

LocalData.getFolderTreeData = async (params) => {
  let folderData = await db.folders.toCollection().sortBy('name')
  let folderStatisticsData = await http.get(BaseAPIUrl + '/folders/statistics', params)
  let retData = prepareFolderData(folderData, folderStatisticsData.data)
  return { data: retData }
}

LocalData.addFolder = (params) => {
  return http.post(BaseAPIUrl + '/folders/', params)
}

LocalData.getFolder = async (id) => {
  let retData = await db.folders.get(id)
  return { data: retData }
}

LocalData.updateFolder = (id, params) => {
  return http.post(BaseAPIUrl + '/folders/' + id, params)
}

LocalData.deleteFolder = (id) => {
  return http.delete(BaseAPIUrl + '/folders/' + id)
}

LocalData.getTrash = () => {
  return http.get(BaseAPIUrl + '/trash')
}

LocalData.emptyTrash = () => {
  return http.post(BaseAPIUrl + '/trash/empty')
}

LocalData.revertTrash = () => {
  return http.post(BaseAPIUrl + '/trash/revert')
}

LocalData.deleteTrash = (id) => {
  return http.delete(BaseAPIUrl + '/trash/' + id)
}

LocalData.restoreTrash = (id) => {
  return http.post(BaseAPIUrl + '/trash/' + id + '/restore')
}

export default LocalData
