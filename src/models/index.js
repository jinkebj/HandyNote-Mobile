import LocalData from '@/models/local-data'
import RemoteData from '@/models/remote-data'

const Model = {}

// clean data & execute full sync
Model.sync = async () => {
  await LocalData.clear()

  let notesData = (await RemoteData.getNoteList({fields: 'all'})).data
  await LocalData.addNoteDataBatch(notesData)

  let foldersData = (await RemoteData.getFolderList()).data
  await LocalData.addFolderDataBatch(foldersData)
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
  await LocalData.updateNote(id, params)
  return ret
}

Model.deleteNote = async (id) => {
  let ret = await RemoteData.deleteNote(id)
  await LocalData.deleteNote(id)
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
  await LocalData.updateFolder(id, params)
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
