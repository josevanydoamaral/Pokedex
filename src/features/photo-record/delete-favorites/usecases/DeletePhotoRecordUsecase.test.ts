import {DeletePhotoRecordUsecase} from "./DeletePhotoRecordUsecase";
import {IImageStorageService} from "../../../../shared/repositories/contracts/IImageStorageService";
import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
import {PhotoRecord} from "../../../../shared/models/PhotoRecord";

describe('DeletePhotoRecordUsecase', () => {
    const storage: IImageStorageService = { delete: jest.fn(), save: jest.fn() };
    const repository: IPhotoRecordRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findPending: jest.fn()
    }

    const sut = new DeletePhotoRecordUsecase(storage, repository);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('Deve remover a foto do armazenamento e pagar o registo associado', async () => {
        // ARRANGE - Preparar os dados
        const fakeData: PhotoRecord = {
            capturedPhotoUri: 'file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg',
            creationDate: '2026-09-17T10:29:37.383Z',
            id: 'f69ecd07-312a-4ce1-8b6b-c734ad5cad0e',
            isFavorite: true,
            pokemon: {
                height: 1,
                id: 57,
                kinds: [ 'fighting' ],
                name: 'primeape',
                spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png',
                weight: 32
            },
            status: 'error'
        }

        jest.mocked(repository.delete).mockResolvedValue()
        jest.mocked(storage.delete).mockResolvedValue()

        // ACT - Executar a ação
        const result = await sut.execute(fakeData)



        // ASSERT - Fazer as verificações
        expect(repository.delete).toHaveBeenCalledTimes(1)
        expect(repository.delete).toHaveBeenCalledWith(fakeData.id)

        expect(storage.delete).toHaveBeenCalledTimes(1)
        expect(storage.delete).toHaveBeenCalledWith(fakeData.capturedPhotoUri)

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.message).toEqual(`Registo apagado com sucesso: ${fakeData.id}`)
        }
    })
})