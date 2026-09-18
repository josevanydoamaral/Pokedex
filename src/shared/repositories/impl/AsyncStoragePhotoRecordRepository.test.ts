import {AsyncStoragePhotoRecordRepository} from "./AsyncStoragePhotoRecordRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PhotoRecord} from "../../models/PhotoRecord";

jest.mock("@react-native-async-storage/async-storage", () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('AsyncStoragePhotoRecordRepository', () => {

    const sut = new AsyncStoragePhotoRecordRepository();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('Deve retornar apenas os registos pendentes(Isso inclui os marcados com o status error).', async () => {
        // ARRANGE Preparar os dados
        const fakeData = ([
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg", "creationDate": "2026-09-17T10:29:37.383Z", "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e", "isFavorite": true, "pokemon": {"height": 1, "id": 57, "kinds": ["fighting"], "name": "primeape", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png", "weight": 32}, "status": "error"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/fearow_221789647228354.jpg", "creationDate": "2026-09-17T12:13:48.385Z", "id": "e8dfeedd-0383-4610-894f-d83274da2780", "isFavorite": true, "pokemon": {"height": 1.2, "id": 22, "kinds": ["normal", "flying"], "name": "fearow", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png", "weight": 38}, "status": "synced"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/wartortle_81789647275533.jpg", "creationDate": "2026-09-17T12:14:35.550Z", "id": "dd6f908d-e79a-4be6-a6eb-15af0fa59685", "isFavorite": true, "pokemon": {"height": 1, "id": 8, "kinds": ["water"], "name": "wartortle", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", "weight": 22.5}, "status": "pending"}
        ])

        jest.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify(fakeData));


        // ACT Executar a ação
        const result = await sut.findPending();

        // ASSERT Fazer as verificações
        expect(result).toHaveLength(2);
        expect(result.every(status => status.status === 'error' || status.status === 'pending')).toEqual(true);
    })

    it('Deve salvar o registo no AsyncStorage', async () => {
        // ARRANGE Preparar os dados
        const fakeData: PhotoRecord = {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg", "creationDate": "2026-09-17T10:29:37.383Z", "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e", "isFavorite": true, "pokemon": {"height": 1, "id": 57, "kinds": ["fighting"], "name": "primeape", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png", "weight": 32}, "status": "error"}
        jest.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify([]));
        jest.mocked(AsyncStorage.setItem).mockResolvedValue();


        // ACT Executar a ação
        const result = await sut.save(fakeData)

        // ASSERT Fazer as verificações
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            'photoRecords',
            JSON.stringify([fakeData])
        );
        expect(result).toEqual({"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg", "creationDate": "2026-09-17T10:29:37.383Z", "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e", "isFavorite": true, "pokemon": {"height": 1, "id": 57, "kinds": ["fighting"], "name": "primeape", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png", "weight": 32}, "status": "error"});
    })

    it('Deve devolver os registos serializados', async () => {
        // ARRANGE Preparar os dados
        const PHOTO_RECORDS = "photoRecords"

        const fakeData = ([
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg", "creationDate": "2026-09-17T10:29:37.383Z", "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e", "isFavorite": true, "pokemon": {"height": 1, "id": 57, "kinds": ["fighting"], "name": "primeape", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png", "weight": 32}, "status": "synced"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/fearow_221789647228354.jpg", "creationDate": "2026-09-17T12:13:48.385Z", "id": "e8dfeedd-0383-4610-894f-d83274da2780", "isFavorite": true, "pokemon": {"height": 1.2, "id": 22, "kinds": ["normal", "flying"], "name": "fearow", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png", "weight": 38}, "status": "error"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/wartortle_81789647275533.jpg", "creationDate": "2026-09-17T12:14:35.550Z", "id": "dd6f908d-e79a-4be6-a6eb-15af0fa59685", "isFavorite": true, "pokemon": {"height": 1, "id": 8, "kinds": ["water"], "name": "wartortle", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", "weight": 22.5}, "status": "pending"}
        ])

        jest.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify(fakeData));

        // ACT Executar a Ação
        const result = await sut.findAll()

        // ASSERT Fazer as verificações
        expect(result).toHaveLength(3);
        expect(result).toEqual([
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/primeape_571789640977355.jpg", "creationDate": "2026-09-17T10:29:37.383Z", "id": "f69ecd07-312a-4ce1-8b6b-c734ad5cad0e", "isFavorite": true, "pokemon": {"height": 1, "id": 57, "kinds": ["fighting"], "name": "primeape", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png", "weight": 32}, "status": "synced"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/fearow_221789647228354.jpg", "creationDate": "2026-09-17T12:13:48.385Z", "id": "e8dfeedd-0383-4610-894f-d83274da2780", "isFavorite": true, "pokemon": {"height": 1.2, "id": 22, "kinds": ["normal", "flying"], "name": "fearow", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png", "weight": 38}, "status": "error"},
            {"capturedPhotoUri": "file:///data/user/0/com.anonymous.pokedexoffline/files/photos/wartortle_81789647275533.jpg", "creationDate": "2026-09-17T12:14:35.550Z", "id": "dd6f908d-e79a-4be6-a6eb-15af0fa59685", "isFavorite": true, "pokemon": {"height": 1, "id": 8, "kinds": ["water"], "name": "wartortle", "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", "weight": 22.5}, "status": "pending"}
        ])
    })
})