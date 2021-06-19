//import makeCommentsDb from './comments-db';
import mongodb, { MongoClient } from 'mongodb';

export class Database {
  private url: string;
  private dbName: string;
  private client: MongoClient;
  constructor() {
    const MongoClient = mongodb.MongoClient;
    this.url = process.env.DB_URL!;
    this.dbName = process.env.DB_NAME!;
    this.client = new MongoClient(this.url!, { useUnifiedTopology: true });
  }
  async makeDb() {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName);
  }
}
