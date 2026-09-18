import {SyncPendingRecordsUsecase} from "./SyncPendingRecordsUsecase";
import {
    AsyncStoragePhotoRecordRepository
} from "../../../../shared/repositories/impl/AsyncStoragePhotoRecordRepository";
import {SynchronizationService} from "../../../../services/SynchronizationService";
import {PokemonApiRepository} from "../../../../shared/repositories/impl/PokemonApiRepository";
import {ISyncPendingRecordsRepository} from "../../../../shared/repositories/contracts/ISyncPendingRecordsRepository";
import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";

describe('SyncPendingRecordsUsecase', () => {
    const offlineRepo: IPhotoRecordRepository = {
        findPending: jest.fn(), update: jest.fn(),
        findAll: jest.fn(), findById: jest.fn(),
        delete: jest.fn(), save: jest.fn()
    }
    const syncService: ISyncPendingRecordsRepository = { syncRecord: jest.fn() }

    const sut = new SyncPendingRecordsUsecase(syncService, offlineRepo);

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve impedir a sincronização duplicada quando chamado em concorrência', async () => {
        // ARRANGE Preparar os dados
        jest.mocked(offlineRepo.findPending).mockResolvedValue([])

        // ACT Executar as tarefas
        const promise1 = sut.execute()
        const promise2 = sut.execute()

        const [result1, result2] = await Promise.all([promise1, promise2])

        // ASSERT Fazer as verificações
        expect(offlineRepo.findPending).toHaveBeenCalledTimes(1)

        if (!result2.success) {
            expect(result2.message).toBe('Demasiadas chamadas de sincronização')
        }

    });
})