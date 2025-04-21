const appWriteDataBaseId = import.meta.env.VITE_APPWRITE_DATABASEID
const appWriteProjectId = import.meta.env.VITE_APPWRITE_PROJECTID
const appWriteCollectionId = import.meta.env.VITE_APPWRITE_COLLECTIONID
const appWriteBacketId = import.meta.env.VITE_APPWRITE_BACKETID

export const config = {
    appWriteBacketId,
    appWriteCollectionId,
    appWriteProjectId,
    appWriteDataBaseId
}

