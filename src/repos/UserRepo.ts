import { Collection, Db } from "mongodb";
import User from "../models/User";
import { collections } from "../../config";
import { v4 } from "uuid";

class UserRepo {
  private collection: Collection<User>;

  constructor(db: Db) {
    this.collection = db.collection(collections.USERS);
  }

  async add(data: Omit<User, "id">) {
    const userObj = { ...data, id: v4() };

    await this.collection.insertOne({ ...userObj });

    return userObj;
  }

  async getByQuery<T = User>(query: object) {
    return await this.collection.find(query).project({ _id: 0 }).toArray() as T[];
  }

  async replaceById(id: string, user: User) {
    await this.collection.replaceOne({ id }, user);
  }
}

export default UserRepo;