import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }


    /* Post Services */

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, { title, content, featuredImage, status, userId })
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, { title, content, featuredImage, status })
    }

    async deletePost(slug) {
        return await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
    }

    async getPost(slug) {
        return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
    }

    async listPosts() {
        return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,
            [
                Query.equal('status', 'active')
            ]);
    }


    /* File handling services */

    async uploadFile(file) {
        return await this.bucket.createFile(conf.appWriteBucketId, ID.unique(), file);
    }

    async deleteFile(fileId) {
        return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appWriteBucketId, fileId)
    }

}

export const service = new Service();
export default service;