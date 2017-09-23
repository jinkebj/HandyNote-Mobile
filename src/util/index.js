export * from '@/util/filters'

export const getCurUsrId = () => { return window.localStorage.getItem('hn-user') }

export const getCurUsrRootFolderId = () => { return window.localStorage.getItem('hn-user') + '-Root' }

export const getCurUsrRecentFolderId = () => { return window.localStorage.getItem('hn-user') + '-Recent' }

export const getCurUsrTrashFolderId = () => { return window.localStorage.getItem('hn-user') + '-Trash' }
