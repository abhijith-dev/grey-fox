import { connect } from "mongoose";
import { Sequelize } from "sequelize";
class ContentDatabase {
  private url:string;

  constructor(){
    this.url = process.env.MONGO_DB_URL as string;
  }

  public async connection(){
    await connect(this.url)
    .then(() => console.log("connected to database"))
    .catch(() => console.log("unable to connect database"))
  }

}

class UserDataBase {
   private username:string;
   private password:string
   constructor(){
      this.username = process.env.USER_DB_USERNAME as string;
      this.password = process.env.USER_DB_PASSWORD as string;
   } 
   public connect():void{
      const sequelize = new Sequelize('user_databse',this.username,this.password,{
         host:'localhost',
         dialect:'mysql'
      })
   }
}

export const userDataBase = new UserDataBase();

export const contentDatabase = new ContentDatabase();
