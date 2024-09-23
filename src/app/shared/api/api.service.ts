import { Injectable } from '@angular/core';
import PocketBase, {
  BaseAuthStore,
  RecordAuthResponse,
  RecordFullListOptions,
  RecordModel,
} from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiDomain = 'http://localhost:8080';
  #pocketbase: PocketBase = new PocketBase(this.apiDomain);
  #authData?: RecordAuthResponse<RecordModel>;

  constructor() {}

  public async getAll(
    collection: string,
    options: RecordFullListOptions = {},
  ): Promise<Array<RecordModel>> {
    return await this.#pocketbase
      .collection(collection)
      .getFullList({ sort: '-created', ...options });
  }

  public async get(
    collection: string,
    id: string,
    options = {},
  ): Promise<RecordModel> {
    return await this.#pocketbase.collection(collection).getOne(id, options);
  }

  public async getFirst(
    name: string,
    condition: string,
    options = {},
  ): Promise<RecordModel> {
    return await this.#pocketbase
      .collection(name)
      .getFirstListItem(condition, options);
  }

  public async create(collection: string, data: object): Promise<RecordModel> {
    return await this.#pocketbase.collection(collection).create(data);
  }

  public async update(
    name: string,
    id: string,
    data: object,
  ): Promise<RecordModel> {
    return await this.#pocketbase.collection(name).update(id, data);
  }

  public async delete(name: string, id: string): Promise<boolean> {
    return await this.#pocketbase.collection(name).delete(id);
  }

  public getFileUrl(record: RecordModel, filename: string): string {
    return this.#pocketbase.files.getUrl(record, filename);
  }

  public async _login(email: string, password: string): Promise<BaseAuthStore> {
    this.#authData = await this.#pocketbase
      .collection('users')
      .authWithPassword(email, password);
    return this.#pocketbase.authStore;
  }

  public getAuthStore(): BaseAuthStore {
    return this.#pocketbase.authStore;
  }
}
