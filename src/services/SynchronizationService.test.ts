import {SynchronizationService} from "./SynchronizationService";
import {IPokemonRepository} from "../shared/repositories/contracts/IPokemonRepository";
import {IPhotoRecordRepository} from "../shared/repositories/contracts/IPhotoRecordRepository";
import {Kind} from "../shared/models/Pokemon";
import {PhotoRecord} from "../shared/models/PhotoRecord";


/*"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg",
    "creationDate": "2026-09-17T10:29:37.383Z",
    "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e",
    "isFavorite": true,
    "pokemon": {
    "height": 1,
        "id": 57,
        "kinds": ["fighting"],
        "name": "primeape",
        "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
        "weight": 32
},
"status": "pending" */

describe('synchronizationService', () => {
    const pokemonRepository: IPokemonRepository = { findPokemon: jest.fn() }
    const offlineStorage: IPhotoRecordRepository = {
        update: jest.fn(), findAll: jest.fn(), findById: jest.fn(),
        delete: jest.fn(), save: jest.fn(), findPending: jest.fn()
    }

    const sut = new SynchronizationService(pokemonRepository, offlineStorage)

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('Deve atualizar com sucesso o registo após a sincronização.', async () => {
        // ARRANGE Preparar os dados
        jest.mocked(pokemonRepository.findPokemon).mockResolvedValue({
            "height": 1,
            "id": 57,
            "kinds": ["fighting"],
            "name": "primeape",
            "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
            "weight": 32
        })

        const record: PhotoRecord = {
            "capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg",
            "creationDate": "2026-09-17T10:29:37.383Z",
            "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e",
            "isFavorite": true,
            "pokemon": {
                "height": 1,
                "id": 57,
                "kinds": ['fighting'],
                "name": "primeape",
                "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
                "weight": 32
            },
            "status": "pending"
        }


        // ACT Executar a ação

        const result: PhotoRecord = await sut.syncRecord(record);
        console.log(result);

        // ASSERT - Fazer as verificações
        expect(offlineStorage.update).toHaveBeenLastCalledWith(result.id, result);

        expect(result.status).toBe('synced');
        expect(result.isFavorite).toBe(true);
        expect(result.capturedPhotoUri).toBe(
            "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg"
        )
    });

    it('Deve manter o registo pendente após a falha', async () => {
        // ARRANGE Preparar os dados

        const record: PhotoRecord = {
            "capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg",
            "creationDate": "2026-09-17T10:29:37.383Z",
            "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e",
            "isFavorite": true,
            "pokemon": {
                "height": 1,
                "id": 57,
                "kinds": ['fighting'],
                "name": "primeape",
                "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
                "weight": 32
            },
            "status": "pending"
        }

        jest.mocked(pokemonRepository.findPokemon).mockResolvedValue(null);

        // ACT - Executar a ação

        const result = await sut.syncRecord(record);

        // ASSERT Fazer as verificações

        expect(result.status).not.toBe('synced');
        expect(result.status).toBe('error');
        expect(result).toEqual({
            "capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg",
            "creationDate": "2026-09-17T10:29:37.383Z",
            "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e",
            "isFavorite": true,
            "pokemon": {
                "height": 1,
                "id": 57,
                "kinds": ['fighting'],
                "name": "primeape",
                "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
                "weight": 32
            },
            "status": "error"
        })
        expect(offlineStorage.update).toHaveBeenLastCalledWith(result.id, result);

    })
})