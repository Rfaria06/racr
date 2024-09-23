import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { RecordModel } from 'pocketbase';
import { New_Track, Track } from '../../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {
  private readonly collectionName: string = 'tracks';

  constructor(public apiService: ApiService) {}

  async getAll(): Promise<Track[]> {
    const records: RecordModel[] = await this.apiService.getAll(
      this.collectionName,
    );
    let recipeList: Track[] = [];
    for (let i: number = 0; i < records.length; i++) {
      const r: RecordModel | null = records[i] ?? null;
      if (!r) throw new Error('No Records');
      recipeList.push(this.createTrackFromModel(r));
    }
    
    return recipeList;
  }

  async get(id_track: string): Promise<Track> {
    const record: RecordModel = await this.apiService.get(
      'track',
      id_track,
      {
        expand: 'id_users',
      },
    );
    return this.createTrackFromModel(record);
  }

  async create(track: New_Track): Promise<void> {
      await this.apiService.create(this.collectionName, {
        id: track.id,
        id_users: track.id_users,
        name: track.name,
        description: track.description,
        image: track.image.get('image'),
        website: track.website,
        created: track.created, 
        updated: track.updated,
      });
  }

  async delete(id: string): Promise<void> {
    await this.apiService.delete(this.collectionName, id);
  }

  async update(id: string, track: object): Promise<void> {
    await this.apiService.update(this.collectionName, id, track);
  }

  public updateImage = async (
    id: string,
    newImage: FormData,
  ): Promise<void> => {
    await this.apiService.update(this.collectionName, id, newImage);
  };

  /**
   * Gets the image url from pocketbase if it is not empty and it is not already a url
   * @param id_recipes the id of the recipes record wich contains the image
   * @param filename the string to be checked and transformed
   * @returns url for the image
   */
  public getTackImageUrl(id_track: string, filename: string): string {
    const isUrl = (str: string): boolean => {
      // Use a simple regex to check if the string is a URL
      const urlRegex = /^http/i;
      return urlRegex.test(str);
    };

    // Check if the filename is already a URL
    if (isUrl(filename)) return filename;

    // Construct the URL using apiUrl, id_recipes, and filename
    return (
      this.apiService.apiDomain +
      '/api/files/track/' +
      id_track +
      '/' +
      filename
    );
  }

  public getOriginalFilenameFromUrl = (url: string): string => {
    const extractFilename = (pathname: string): string => {
      const segments = pathname.split('/');
      return segments[segments.length - 1] ?? url;
    };

    const isUrl = (str: string): boolean => /^http/i.test(str);

    try {
      const urlObject = new URL(url);
      return isUrl(url) ? extractFilename(urlObject.pathname) : '';
    } catch (error) {
      // Handle invalid URL or other errors
      console.error('Error parsing URL:', error);
      return '';
    }
  };

  /**
   * creates a recipe from the RecordModel
   * Also cuts strings that aren't allowed to be more than 50 characters
   */
  private createTrackFromModel(record: RecordModel): Track {
    const cut = (str: string, len: number): string =>
      str.length > len ? str.slice(0, len) + '...' : str;

    return new Track(
      record.id,
      record['id_users'],
      cut(record['name'], 50),
      cut(record['description'], 3500),
      this.getTackImageUrl(record.id, record['image']),
      record['website'],
      new Date(record['created']),
      new Date(record['updated']),
    );
  }
}
