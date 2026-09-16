import {ExpoImageStorageService} from "../../../services/ExpoImageStorageService";
import {AsyncStoragePhotoRecordRepository} from "../../../shared/repositories/impl/AsyncStoragePhotoRecordRepository";
import {SavePhotoRecordUsecase} from "../save-photo-record/usecases/SavePhotoRecordUsecase";
import {GetFavoritesUsecase} from "../get-favorites/usecases/GetFavoritesUsecase";
import {DeletePhotoRecordUsecase} from "../delete-favorites/usecases/DeletePhotoRecordUsecase";


const expoImageStorageService = new ExpoImageStorageService()
const photoRecordRepository = new AsyncStoragePhotoRecordRepository();

export const savePhotoRecordUsecase = new SavePhotoRecordUsecase(photoRecordRepository, expoImageStorageService);
export const getFavoritesUsecase = new GetFavoritesUsecase(photoRecordRepository);
export const deletePhotoRecordUsecase = new DeletePhotoRecordUsecase(expoImageStorageService, photoRecordRepository)
