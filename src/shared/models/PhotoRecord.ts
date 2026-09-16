import { Pokemon } from "./Pokemon";

export type Status = 'pending' | 'syncing' | 'synced' | 'error';


export interface PhotoRecord {
    id: string;
    pokemon: Pokemon;
    capturedPhotoUri?: string;
    isFavorite: boolean;
    creationDate: string;
    status: Status;
}