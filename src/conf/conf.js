const conf={
    appwriteUrl:String(process.env.BLOG_APP_APPWRITE_URL),
    appwriteProjectId:String(process.env.BLOG_APP_APPWRITE_ID),
    appwriteCollectionId:String(process.env.BLOG_APP_APPWRITE_COLLECTION_ID),
    appwriteDatabaseId:String(process.env.BLOG_APP_APPWRITE_DATABASE_ID),
    appwriteBucketId:String(process.env.BLOG_APP_APPWRITE_BUCKET_ID),
}
export default conf;