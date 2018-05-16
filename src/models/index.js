import {getCurUsrLocalUsn} from '@/util'
import LocalData from '@/models/local-data'
import RemoteData from '@/models/remote-data'

const Model = {}

// execute delta sync
Model.sync = async () => {
  let localUsn = getCurUsrLocalUsn()
  let remoteUsn = (await RemoteData.getProfile()).data.latestUsn
  if (Number.parseInt(localUsn) === Number.parseInt(remoteUsn)) {
    console.log('no delta change!')
    return
  } else if (Number.parseInt(localUsn) > Number.parseInt(remoteUsn)) { // should never happen
    localUsn = 0
  }

  let notesData = (await RemoteData.getNoteList({fields: 'all', skip_usn: localUsn})).data
  await LocalData.addNoteDataBatch(notesData)

  let foldersData = (await RemoteData.getFolderList({skip_usn: localUsn})).data
  await LocalData.addFolderDataBatch(foldersData)

  window.localStorage.setItem('hn-local-usn', remoteUsn)
}

Model.clearLocalData = async () => {
  window.localStorage.removeItem('hn-local-usn')
  await LocalData.clear()
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
  return LocalData.getNoteList(params)
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

Model.emptyTrash = () => {
  return RemoteData.emptyTrash()
}

Model.revertTrash = () => {
  return RemoteData.revertTrash()
}

Model.deleteTrash = (id) => {
  return RemoteData.deleteTrash(id)
}

Model.restoreTrash = (id) => {
  return RemoteData.restoreTrash(id)
}

export default Model
