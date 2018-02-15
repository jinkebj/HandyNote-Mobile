import http from 'axios'
import {HANDYNOTE_SERVICE_API} from '@/../config'
const BaseAPIUrl = process.env.HANDYNOTE_SERVICE_API || HANDYNOTE_SERVICE_API

import Dexie from 'dexie'
import {prepareFolderData} from '@/util'

const LocalData = {}
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

LocalData.addNote = async (params) => {
  if (params.contents !== undefined && typeof params.contents === 'object') {
    params.contents = JSON.stringify(params.contents)
  }
  await db.notesDetails.put(params)
  return await db.notes.put(params)
}

LocalData.getNote = async (id) => {
  let retData = await db.notesDetails.get(id)
  return { data: retData }
}

LocalData.updateNote = async (id, params) => {
  if (params.contents !== undefined && typeof params.contents === 'object') {
    params.contents = JSON.stringify(params.contents)
  }
  await db.notesDetails.update(id, params)
  return await db.notes.update(id, params)
}

LocalData.deleteNote = async (id) => {
  await db.notesDetails.delete(id)
  return await db.notes.delete(id)
}

LocalData.getFolderTreeData = async (params) => {
  let folderData = await db.folders.toCollection().sortBy('name')
  let folderStatisticsData = await http.get(BaseAPIUrl + '/folders/statistics', params)
  let retData = prepareFolderData(folderData, folderStatisticsData.data)
  return { data: retData }
}

LocalData.addFolder = (params) => {
  return db.folders.add(params)
}

LocalData.getFolder = async (id) => {
  let retData = await db.folders.get(id)
  return { data: retData }
}

LocalData.updateFolder = async (id, params) => {
  let retData = await db.folders.update(id, params)
  return { data: retData }
}

LocalData.deleteFolder = async (id) => {
  await db.notes.where({folder_id: id}).delete()
  await db.notesDetails.where({folder_id: id}).delete()
  return await db.folders.delete(id)
}

// LocalData.getTrash = async () => {
//   let retData = await db.notes.where({deleted: 1}).reverse().sortBy('updated_at')
//   return { data: retData }
// }

// LocalData.emptyTrash = () => {
//   return http.post(BaseAPIUrl + '/trash/empty')
// }
//
// LocalData.revertTrash = () => {
//   return http.post(BaseAPIUrl + '/trash/revert')
// }
//
// LocalData.deleteTrash = (id) => {
//   return http.delete(BaseAPIUrl + '/trash/' + id)
// }
//
// LocalData.restoreTrash = (id) => {
//   return http.post(BaseAPIUrl + '/trash/' + id + '/restore')
// }

export default LocalData
