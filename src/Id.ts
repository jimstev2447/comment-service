import cuid from 'cuid';
import { Id_spec } from './Comment';

export class Id implements Id_spec {
  makeId() {
    return cuid();
  }
  isValidId(str: string) {
    return cuid.isCuid(str);
  }
}
