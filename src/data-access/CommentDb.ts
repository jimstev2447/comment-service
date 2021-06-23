import { Database } from './Database';

export class CommentDb {
  private connection: Database;
  constructor(connection: Database) {
    this.connection = connection;
  }
}
