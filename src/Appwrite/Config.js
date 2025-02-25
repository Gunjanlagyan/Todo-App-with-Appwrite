import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async addtodo(todo) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                todo
            );
        } catch (error) {
            console.error("Error adding todo:", error.message);
            throw new Error("Failed to add todo, please try again later.");
        }
    }

    async updatetodo(documentID, todo) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentID,
                todo
            );
        } catch (error) {
            console.error("Error updating todo:", error.message);
        }
    }

    async deletetodo(documentID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentID
            );
            return true;
        } catch (error) {
            console.error("Error delete todo:", error.message);
        }
    }

    async gettodos() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.orderDesc("$createdAt"),

                ]
            );
        } catch (error) {
            console.error("Error listtodo:", error.message);
            return false;
        }
    }


}

const service = new Service();
export default service;
