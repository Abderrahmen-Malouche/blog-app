import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";
export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async getDocument(slug) {
    try {
      return await database.getDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug
      );
    } catch (e) {
      console.log("Error in getDocument", e);
      throw e;
    }
  }
  async getDocuments(queries = [Query.equal("status", "active")]) {
    try {
      return await database.getDocuments(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        queries
      );
    } catch (e) {
      console.log("Error in getDocuments", e);
      throw e;
    }
  }
  async createDocument({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      console.log("Error in createDocument", e);
      throw e;
    }
  }
  async updateDocument({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      console.log("Error in updateDocument", e);
      throw e;
    }
  }
  async deleteDocument(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
      );
      return true;
    } catch (e) {
      console.log("Error in deleteDocument", e);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique,
        file
      );
    } catch (e) {
      console.log("Error in uploadFile", e);
      throw e;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (e) {
      console.log("Error in deleteFile", e);
      throw e;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    } catch (e) {
      console.log("Error in getFilePreview", e);
      throw e;
    }
  }
  async getPosts(){
    try{
      return await this.database.listDocuments(conf.appwriteBucketId,conf.appwriteCollectionId);
    }
    catch(e){
      console.log("Error in getPosts",e);
      throw e;
    }
  }
}
const appwriteService = new Service();
export default appwriteService;