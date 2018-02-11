import LocalData from '@/models/local-data'
import RemoteData from '@/models/remote-data'

const Model = {}
const controller = LocalData

// clean data & execute full sync
Model.sync = async () => {
  await LocalData.clear()

  let notesData = (await RemoteData.getNoteList()).data
  await LocalData.addNoteDataBatch(notesData)

  let notesDetailsData = (await RemoteData.getNoteList({fields: 'all'})).data
  await LocalData.addNoteDetailDataBatch(notesDetailsData)

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
  return controller.getNoteList(params)
}

Model.addNote = (params) => {
  return controller.addNote(params)
}

Model.getNote = (id) => {
  return controller.getNote(id)
}

Model.updateNote = (id, params) => {
  return controller.updateNote(id, params)
}

Model.deleteNote = (id) => {
  return controller.deleteNote(id)
}

Model.getFolderTreeData = (params) => {
  return controller.getFolderTreeData(params)
}

Model.addFolder = (params) => {
  return controller.addFolder(params)
}

Model.getFolder = (id) => {
  return controller.getFolder(id)
}

Model.updateFolder = (id, params) => {
  return controller.updateFolder(id, params)
}

Model.deleteFolder = (id) => {
  return controller.deleteFolder(id)
}

Model.getTrash = () => {
  return controller.getTrash()
}

Model.emptyTrash = () => {
  return controller.emptyTrash()
}

Model.revertTrash = () => {
  return controller.revertTrash()
}

Model.deleteTrash = (id) => {
  return controller.deleteTrash(id)
}

Model.restoreTrash = (id) => {
  return controller.restoreTrash(id)
}

export default Model
