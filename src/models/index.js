import {getCurUsrLocalUsn} from '@/util'
import LocalData from '@/models/local-data'
import RemoteData from '@/models/remote-data'

const Model = {}

// execute delta sync
Model.sync = async () => {
  // compare local usn with remote usn
  let localUsn = getCurUsrLocalUsn()
  let remoteUsn = (await RemoteData.getProfile()).data.latestUsn
  if (Number.parseInt(localUsn) === Number.parseInt(remoteUsn)) {
    console.log('no delta change!')
    return
  } else if (Number.parseInt(localUsn) > Number.parseInt(remoteUsn)) { // should never happen
    localUsn = 0
  }

  // delete non-exist notes from local data
  let localNoteIds = (await LocalData.getAllNoteIds()).join(',')
  let nonExistNoteIds = (await RemoteData.getNotExistNoteIds(localNoteIds)).data
  for (let nonExistNoteId of nonExistNoteIds) {
    await LocalData.deleteNote(nonExistNoteId)
  }

  // delete non-exist folders from local data
  let localFolderIds = (await LocalData.getAllFolderIds()).join(',')
  let nonExistFolderIds = (await RemoteData.getNotExistFolderIds(localFolderIds)).data
  for (let nonExistFolderId of nonExistFolderIds) {
    await LocalData.deleteFolderOnly(nonExistFolderId)
  }

  // update local note data
  let notesData = (await RemoteData.getNoteList({fields: 'all', skip_usn: localUsn})).data
  await LocalData.addNoteDataBatch(notesData)

  // update local folder data
  let foldersData = (await RemoteData.getFolderList({skip_usn: localUsn})).data
  await LocalData.addFolderDataBatch(foldersData)

  // update local usn
  window.localStorage.setItem('hn-local-usn', remoteUsn)
}

Model.clearLocalData = async () => {
  window.localStorage.removeItem('hn-local-usn')
  window.localStorage.removeItem('hn-folder-list-cache')
  await LocalData.clear()
}

Model.remoteTest = (baseUrl) => {
  return RemoteData.test(baseUrl)
}

Model.getStaticUrl = () => {
  return RemoteData.getStaticUrl()
}

Model.getHttpPrototype = () => {
  return RemoteData.getHttpPrototype()
}

Model.login = (params) => {
  return RemoteData.login(params)
}

Model.getNoteList = (params) => {
  if (params.search !== undefined) {
    return RemoteData.getNoteList(params)
  } else {
    return LocalData.getNoteList(params)
  }
}

Model.addNote = async (params) => {
  let ret = await RemoteData.addNote(params)
  await LocalData.addNote(ret.data)
  return ret
}

Model.getNote = (id) => {
  return LocalData.getNote(id)
}

Model.updateNote = async (id, params) => {
  let ret = await RemoteData.updateNote(id, params)
  await LocalData.updateNote(id, ret.data)
  return ret
}

Model.deleteNote = async (id) => {
  let ret = await RemoteData.deleteNote(id)
  await LocalData.deleteNote(id)
  return ret
}

Model.updateImage = async (id, params) => {
  let ret = await RemoteData.updateImage(id, params)
  await LocalData.updateNote(ret.data.note_id, {updated_at: ret.data.updated_at})
  return ret
}

Model.getFolderTreeData = (params) => {
  return LocalData.getFolderTreeData(params)
}

Model.addFolder = async (params) => {
  let ret = await RemoteData.addFolder(params)
  await LocalData.addFolder(ret.data)
  return ret
}

Model.getFolder = (id) => {
  return LocalData.getFolder(id)
}

Model.updateFolder = async (id, params) => {
  let ret = await RemoteData.updateFolder(id, params)
  await LocalData.updateFolder(id, ret.data)
  if (params.parent_id !== undefined) {
    let foldersData = (await RemoteData.getFolderList()).data
    await LocalData.clearFolder()
    await LocalData.addFolderDataBatch(foldersData)
  }
  return ret
}

Model.deleteFolder = async (id) => {
  let ret = await RemoteData.deleteFolder(id)
  await LocalData.deleteFolder(id)
  return ret
}

Model.getTrash = () => {
  return RemoteData.getTrash()
}

Model.emptyTrash = async () => {
  let ret = RemoteData.emptyTrash()
  await Model.sync()
  return ret
}

Model.revertTrash = async () => {
  let ret = await RemoteData.revertTrash()
  await Model.sync()
  return ret
}

Model.deleteTrash = async (id) => {
  let ret = RemoteData.deleteTrash(id)
  await Model.sync()
  return ret
}

Model.restoreTrash = async (id) => {
  let ret = RemoteData.restoreTrash(id)
  await Model.sync()
  return ret
}

export default Model
