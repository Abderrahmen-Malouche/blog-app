import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount= await this.account.create(ID.unique(),email, password, name);    
      if(userAccount){
        return this.login(email,password);
      }
      else{
        return userAccount;
      }
    } catch (e) {
      throw e;
    }
  }
  async login({email,password}) {
    try{
        return await this.account.createSession(email,password)
    }
    catch(e){
        throw e;
    }
  }
  async logout() {
    try{
        return await this.account.deleteSessions();
    }
    catch(e){
        console.log("Error Logging out user",e);
    }
  }
  async getCurrentUser() {
    try{
        return await thisaccount.get();
    }
    catch(e){
        console.log("Error getting current user",e);
    }
  }
}

const authservice = new AuthService();
export default authservice;