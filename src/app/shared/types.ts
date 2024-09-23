import { AuthModel } from 'pocketbase';
import { Track } from './models/track';

export interface RacingEvent {
  id: string;
  name: string;
  description: string;
  date: Date;
  user: AuthModel;
  track: Track;
}
