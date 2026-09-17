import {SynchronizationService} from "../../../services/SynchronizationService";
import {
    AsyncStoragePhotoRecordRepository
} from "../../../shared/repositories/impl/AsyncStoragePhotoRecordRepository";
import {PokemonApiRepository} from "../../../shared/repositories/impl/PokemonApiRepository";
import {SyncPendingRecordsUsecase} from "../sync-records/usecases/SyncPendingRecordsUsecase";

const offlineRepository = new AsyncStoragePhotoRecordRepository()
const apiRepository = new PokemonApiRepository()

const syncService = new SynchronizationService(apiRepository, offlineRepository)

export const syncPendingRecordsUsecase = new SyncPendingRecordsUsecase(syncService, offlineRepository)