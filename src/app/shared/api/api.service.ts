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
  #pocketbase: PocketBase = new PocketBase('https://pocketbase.axanet.ch');
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

  public async create(
    collection: string,
    data: object,
    options = {},
  ): Promise<RecordModel> {
    console.log('START POST');
    const x = await this.#pocketbase
      .collection(collection)
      .create(data, options);
    console.log('END POST');
    return x;
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
