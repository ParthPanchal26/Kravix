const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    tinymceApiKye: String(import.meta.env.VITE_TINYMCE_APIKYE),
    nodeEnv: String(import.meta.env.VITE_NODE_ENV)
};

export default conf;