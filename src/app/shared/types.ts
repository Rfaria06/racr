import { AuthModel } from 'pocketbase';
import { Track } from './models/track';

export interface RacingEvent {
  id: string;
  name: string;
  description: string;
  date: Date;
  user?: AuthModel;
  id_users?: string;
  track?: Track;
  id_tracks?: string;
  participations?: Array<Participation>;
}

export interface Participation {
  id: string;
  user: AuthModel;
  event: RacingEvent;
}

export interface MychronSession {
  id: string;
  user: AuthModel;
  track: Track;
  event?: RacingEvent;
  name: string;
  description: string;
  files: Array<string>;
}
