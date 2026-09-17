import {IPokemonRepository} from "../shared/repositories/contracts/IPokemonRepository";
import {IPhotoRecordRepository} from "../shared/repositories/contracts/IPhotoRecordRepository";
import {PhotoRecord} from "../shared/models/PhotoRecord";
import {ISyncPendingRecordsRepository} from "../shared/repositories/contracts/ISyncPendingRecordsRepository";

export class SynchronizationService implements ISyncPendingRecordsRepository {
    constructor(private apiRepo: IPokemonRepository, private offlineStorage: IPhotoRecordRepository) {}

    async syncRecord(record: PhotoRecord): Promise<PhotoRecord> {
        try {
            record.status = 'syncing';
            await this.offlineStorage.update(record.id, record);

            const apiRecord = await this.apiRepo.findPokemon(record.pokemon.name);

            if (!apiRecord) {
                record.status = 'error';
                await this.offlineStorage.update(record.id, record);
                return record;
            }

            const updatedRecord: PhotoRecord = {
                id: record.id,
                pokemon: apiRecord,
                isFavorite: record.isFavorite,
                status: 'synced',
                capturedPhotoUri: record.capturedPhotoUri,
                creationDate: record.creationDate,
            }

            await this.offlineStorage.update(updatedRecord.id, updatedRecord);

            return updatedRecord;
        } catch {
            record.status = 'error';
            await this.offlineStorage.update(record.id, record);
            return record;
        }


    }


}