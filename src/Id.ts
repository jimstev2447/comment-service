import cuid from 'cuid';
export interface Id_interface {
  makeId: () => string;
  isValidId: (s: string) => boolean;
}
export class Id implements Id_interface {
  makeId() {
    return cuid();
  }
  isValidId(str: string) {
    return cuid.isCuid(str);
  }
}
