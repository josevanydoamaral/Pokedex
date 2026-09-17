import {ISyncPendingRecordsRepository} from "../../../../shared/repositories/contracts/ISyncPendingRecordsRepository";
import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
type SyncPendingRecordsUsecaseResult =
    { success: boolean, message: string }

export class SyncPendingRecordsUsecase {
    private isRunning = false;
    private countSuccess = 0;
    constructor(private syncService: ISyncPendingRecordsRepository, private offlineStorage: IPhotoRecordRepository) {}

    async execute(): Promise<SyncPendingRecordsUsecaseResult> {
        if (this.isRunning) return {success: true, message: 'Demasiadas chamadas de sincronização'};

        this.isRunning = true;

        try {
            const pendingRecords = await this.offlineStorage.findPending();
            this.countSuccess = 0;
            for (const pendingRecord of pendingRecords) {
                const result = await this.syncService.syncRecord(pendingRecord);
                if (result.status === 'synced') this.countSuccess++;
            }

            return { success: true, message: `${this.countSuccess} de ${pendingRecords.length} registos sincronizados.`}

        } finally {
            this.isRunning = false;
        }
    }
}