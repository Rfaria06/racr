import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Setup } from '../../models/setup';
import { RecordModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private readonly collectionName: string = 'setups';

  constructor(public apiService: ApiService) { }

  async getAll(): Promise<Setup[]> {
    const records: RecordModel[] = await this.apiService.getAll(
      this.collectionName,
    );
    let setupList: Setup[] = [];
    for (let i: number = 0; i < records.length; i++) {
      const r: RecordModel | null = records[i] ?? null;
      if (!r) throw new Error('No Records');
      setupList.push(this.createSetupFromModel(r));
    }
    return setupList;
  }

  async create(setup: Setup): Promise<void> {
    await this.apiService.create(this.collectionName, {
      id: setup.id,
      id_users: setup.id_users,
      name: setup.name,
      description: setup.description,
      weatherConditions: setup.weatherConditions
    });
}
  
  private createSetupFromModel(record: RecordModel): Setup {
    return new Setup(
      record.id,
      record['id_users'],
      record['name'],
      record['description'],
      record['weatherConditions']
    );
  }
}
