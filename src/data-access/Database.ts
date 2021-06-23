import { MongoClient } from 'mongodb';

export class Database {
  private client: MongoClient;
  private url: string;
  private dbName: string;
  constructor() {
    if (typeof process.env.DB_URL !== 'string') {
      throw new Error('DB_URL not set');
    }
    if (typeof process.env.DB_NAME !== 'string') {
      throw new Error('DB_NAME not set');
    }
    this.url = process.env.DB_URL;
    this.dbName = process.env.DB_NAME!;
    this.client = new MongoClient(this.url!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  async connect() {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
  }
  async close() {
    await this.client.close();
  }
  getDb() {
    return this.client.db(this.dbName);
  }
}
