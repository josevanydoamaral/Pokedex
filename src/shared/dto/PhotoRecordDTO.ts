import {Pokemon} from "../models/Pokemon";
import {Status} from "../models/PhotoRecord";

export interface PhotoRecordDTO {
    pokemon: Pokemon;
    capturedPhotoUri?: string;

}