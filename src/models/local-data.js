import Dexie from 'dexie'
import {getCurUsrRootFolderId, getCurUsrRootFolderName, prepareFolderData} from '@/util'

const LocalData = {}
const db = new Dexie('HandyNote')

// define local db schema
db.version(1).stores({
  notes: '&_id, folder_id, starred',
  folders: '&_id'
})

LocalData.clear = async () => {
  await db.notes.clear()
  await LocalData.clearFolder()
}

LocalData.clearFolder = async () => {
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

LocalData.getAllNoteIds = async () => {
  return await db.notes.toCollection().primaryKeys()
}

LocalData.getNoteList = async (params) => {
  let skip = -1
  if (params.skip !== undefined && typeof params.skip === 'number') {
    skip = params.skip
    delete params.skip
  }

  let limit = -1
  if (params.limit !== undefined && typeof params.limit === 'number') {
    limit = params.limit
    delete params.limit
  }

  let query
  if (JSON.stringify(params) === JSON.stringify({})) {
    query = db.notes.toCollection().reverse()
  } else {
    query = db.notes.where(params).reverse()
  }

  // if (skip >= 0) query = query.offset(skip)
  // if (limit > 0) query = query.limit(limit)

  let retData = await query.sortBy('updated_at')

  if (skip >= 0) retData = retData.slice(skip)
  if (limit > 0) retData = retData.slice(0, limit)

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

LocalData.getAllFolderIds = async () => {
  return await db.folders.toCollection().primaryKeys()
}

LocalData.getFolderTreeData = async (params) => {
  let foldersData = await db.folders.toCollection().sortBy('name')

  // handle exclude_id for move folder
  if (params !== undefined && params !== null && params.exclude_id !== undefined) {
    foldersData = foldersData.filter(
      foldersData => foldersData.ancestor_ids.toString().indexOf(params.exclude_id) < 0 && foldersData._id !== params.exclude_id)
  }

  let rootFolder = {
    type: 0,
    _id: getCurUsrRootFolderId(),
    name: getCurUsrRootFolderName(),
    ancestor_ids: []
  }
  foldersData.unshift(rootFolder)

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

LocalData.deleteFolderOnly = async (id) => {
  return await db.folders.delete(id)
}

export default LocalData
