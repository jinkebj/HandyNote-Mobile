import Pica from 'pica'
import {maxUploadPicSize} from '@/../config'
export * from '@/util/filters'

export const prepareFolderData = (folderData, folderStatisticsData) => {
  let rootItem = {
    type: 0,
    id: getCurUsrRootFolderId(),
    label: getCurUsrRootFolderName(),
    ancestor_ids: [],
    children: [],
    note_count_cur: 0, // count of notes under current folder
    note_count_all: 0 // count of notes under current folder and all sub folders
  }
  if (typeof folderData !== 'object' || folderData.length === 0) return [rootItem]

  let itemMap = new Map()
  itemMap.set(rootItem.id, rootItem)

  let maxLevel = 0
  let levelMap = new Map()

  folderData.forEach(item => {
    const curLevel = item.ancestor_ids.length
    maxLevel = Math.max(curLevel, maxLevel)
    itemMap.set(item._id, {
      id: item._id,
      label: item.name,
      ancestor_ids: item.ancestor_ids,
      children: [],
      note_count_cur: 0,
      note_count_all: 0
    })
    let levelItem = {itemId: item._id, parentId: item.parent_id}
    if (levelMap.has(curLevel)) {
      levelMap.get(curLevel).push(levelItem)
    } else {
      levelMap.set(curLevel, [levelItem])
    }
  })

  folderStatisticsData.forEach(item => {
    if (itemMap.has(item._id)) {
      itemMap.get(item._id).note_count_cur = item.count
      itemMap.get(item._id).note_count_all = item.count
    }
  })

  // console.log(itemMap)
  // console.log('maxLevel is: ' + maxLevel)
  // console.log(levelMap)

  for (let i = maxLevel; i > 0; i--) {
    if (!levelMap.has(i)) continue
    let levelItems = levelMap.get(i)
    levelItems.forEach(item => {
      if (itemMap.has(item.parentId) && itemMap.has(item.itemId)) {
        itemMap.get(item.parentId).children.push(itemMap.get(item.itemId))
        itemMap.get(item.parentId).note_count_all += itemMap.get(item.itemId).note_count_all
      }
    })
  }

  return [itemMap.get(rootItem.id)]
}

const getImgObj = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.src = url
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (err) => {
      reject(err)
    }
  })
}

const pica = new Pica()

export const getResizedImgData = async (origImgData) => {
  const MAX_SIZE = maxUploadPicSize
  let ret = origImgData
  let origImgObj = await getImgObj(origImgData)
  console.log('original img width: ' + origImgObj.width + ', height: ' + origImgObj.height)

  if (origImgObj.width > MAX_SIZE || origImgObj.height > MAX_SIZE) {
    // calculate resized width & height
    let resizedWidth = origImgObj.width
    let resizedHeight = origImgObj.height
    if (resizedHeight > resizedWidth) {
      resizedHeight = Math.min(resizedHeight, MAX_SIZE)
      resizedWidth = resizedHeight * (origImgObj.width / origImgObj.height)
    } else {
      resizedWidth = Math.min(resizedWidth, MAX_SIZE)
      resizedHeight = resizedWidth * (origImgObj.height / origImgObj.width)
    }
    console.log('resized img width: ' + resizedWidth + ', height: ' + resizedHeight)

    let resizedCanvas = document.createElement('canvas')
    resizedCanvas.width = resizedWidth
    resizedCanvas.height = resizedHeight

    let result = await pica.resize(origImgObj, resizedCanvas)
    ret = result.toDataURL('image/jpeg')
  }

  return ret
}

export const getCurUsrId = () => { return window.localStorage.getItem('hn-user') }

export const getCurUsrRootFolderId = () => { return window.localStorage.getItem('hn-user') + '-Root' }

export const getCurUsrRootFolderName = () => { return 'My Folders' }

export const getCurUsrRecentFolderId = () => { return window.localStorage.getItem('hn-user') + '-Recent' }

export const getCurUsrStarFolderId = () => { return window.localStorage.getItem('hn-user') + '-Starred' }

export const getCurUsrTrashFolderId = () => { return window.localStorage.getItem('hn-user') + '-Trash' }
