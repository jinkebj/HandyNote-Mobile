import Dexie from 'dexie'
import {prepareFolderData} from '@/util'

const LocalData = {}
const db = new Dexie('HandyNote')

// define local db schema
db.version(1).stores({
  notes: '&_id, name, text, contents, *folder_id, starred, deleted, owner, folder_name, digest, created_at, updated_at',
  folders: '&_id, name, parent_id, ancestor_ids, deleted, owner, created_at, updated_at'
})

LocalData.clear = async () => {
  await db.notes.clear()
  await db.folders.clear()
}

LocalData.addNoteDataBatch = async (notesData) => {
  for (let noteData of notesData) {
    if (noteData.contents !== undefined && typeof noteData.contents === 'object') {
      noteData.contents = JSON.stringify(noteData.contents)
    }
    await db.notes.put(noteData)
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
  return await db.notes.put(params)
}

LocalData.getNote = async (id) => {
  let retData = await db.notes.get(id)
  return { data: retData }
}

LocalData.updateNote = async (id, params) => {
  if (params.contents !== undefined && typeof params.contents === 'object') {
    params.contents = JSON.stringify(params.contents)
  }
  return await db.notes.update(id, params)
}

LocalData.deleteNote = async (id) => {
  return await db.notes.delete(id)
}

LocalData.getFolderTreeData = async (params) => {
  let foldersData = await db.folders.toCollection().sortBy('name')
  // let folderStatisticsData = (await http.get(BaseAPIUrl + '/folders/statistics', params)).data
  let folderStatisticsData = []
  for (let folderData of foldersData) {
    let noteCount = await db.notes.where('folder_id').equals(folderData._id).count()
    folderStatisticsData.push({_id: folderData._id, count: noteCount})
  }
  let retData = prepareFolderData(foldersData, folderStatisticsData)
  return { data: retData }
}

LocalData.addFolder = async (params) => {
  return await db.folders.put(params)
}

LocalData.getFolder = async (id) => {
  let retData = await db.folders.get(id)
  return { data: retData }
}

LocalData.updateFolder = async (id, params) => {
  let retData = await db.folders.update(id, params)
  // await db.notes.where('folder_id').equals(id).modify({folder_name: params.name})
  // workaround for safari issue, https://github.com/dfahlander/Dexie.js/issues/594
  await db.notes.where('folder_id').equals(id).primaryKeys().then(keys => {
    db.notes.where('_id').anyOf(keys).modify({folder_name: params.name})
  })
  return retData
}

LocalData.deleteFolder = async (id) => {
  await db.notes.where({folder_id: id}).delete()
  return await db.folders.delete(id)
}

export default LocalData
