export * from '@/util/filters'

export const prepareFolderData = (topItem, inputData) => {
  if (typeof inputData !== 'object' || inputData.length === 0) return [topItem]

  let rootItem = JSON.parse(JSON.stringify(topItem)) // deep copy
  rootItem.children = []

  let itemMap = new Map()
  itemMap.set(topItem.id, rootItem)

  let maxLevel = 0
  let levelMap = new Map()

  inputData.forEach(item => {
    const curLevel = item.ancestor_ids.length
    maxLevel = Math.max(curLevel, maxLevel)
    itemMap.set(item._id, {
      id: item._id,
      label: item.name,
      ancestor_ids: item.ancestor_ids,
      children: []
    })
    let levelItem = {itemId: item._id, parentId: item.parent_id}
    if (levelMap.has(curLevel)) {
      levelMap.get(curLevel).push(levelItem)
    } else {
      levelMap.set(curLevel, [levelItem])
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
      }
    })
  }

  return [itemMap.get(topItem.id)]
}

export const getCurUsrId = () => { return window.localStorage.getItem('hn-user') }

export const getCurUsrRootFolderId = () => { return window.localStorage.getItem('hn-user') + '-Root' }

export const getCurUsrRecentFolderId = () => { return window.localStorage.getItem('hn-user') + '-Recent' }

export const getCurUsrTrashFolderId = () => { return window.localStorage.getItem('hn-user') + '-Trash' }
