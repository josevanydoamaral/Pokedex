import { SavePhotoRecordUsecase } from "./SavePhotoRecordUsecase";
import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
import {IImageStorageService} from "../../../../shared/repositories/contracts/IImageStorageService";
import {Pokemon} from "../../../../shared/models/Pokemon";
import * as Crypto from 'expo-crypto';
import {PhotoRecord} from "../../../../shared/models/PhotoRecord";
import {PhotoRecordDTO} from "../../../../shared/dto/PhotoRecordDTO";



describe("SavePhotoRecordUsecase", () => {
    const mockStorage: IImageStorageService = { save: jest.fn(), delete: jest.fn() };
    const mockRepository: IPhotoRecordRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findPending: jest.fn()
    }

    const sut = new SavePhotoRecordUsecase(mockRepository, mockStorage);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Deve retornar erro se a foto não for passada", async () => {
        // ARRANGE
        // Preparar os dados

        const fakePokemon: Pokemon = {
            id: 1,
            name: "Tarzan",
            height: 1.2,
            weight: 2,
            kinds: ['electric'],
            spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png"
        }

        const fakePhotoRecord: PhotoRecordDTO = {
            pokemon: fakePokemon,
            capturedPhotoUri: "",
        }

        // ACT
        // Executar a ação

        const result = await sut.execute(fakePhotoRecord);

        // Assert
        // Fazer as verificações

        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.errorMessage).toBe('A foto é obrigatória.')
        }

        expect(mockStorage.save).not.toHaveBeenCalled();
        expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it("Deve retornar o objeto do tipo PhotoRecord persistido na base de dados", async () => {
        // ARRANGE preparar os dados

        const fakePokemon: Pokemon = {
            id: 1,
            name: "Tarzan",
            height: 1.2,
            weight: 2,
            kinds: ['electric'],
            spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png"
        }

        const fakePhotoRecord: PhotoRecordDTO = {
            pokemon: fakePokemon,
            capturedPhotoUri: "file:///temp/camera.jpg",
        }

        const fakePath = "file:///saved/photo.jpg"

        const fakeCreatedRepository: PhotoRecord = {
            id: Crypto.randomUUID(),
            pokemon: fakePokemon,
            isFavorite: false,
            capturedPhotoUri: fakePath,
            creationDate: new Date().toISOString(),
            status: 'pending'

        }

        jest.mocked(mockStorage.save).mockResolvedValue(fakePath);
        jest.mocked(mockRepository.save).mockResolvedValue(fakeCreatedRepository);

        // ACT Executar a ação
        const result = await sut.execute(fakePhotoRecord);
        console.log(result)

        // ASSERT

        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.result.capturedPhotoUri).toBe(fakePath);
        }

        expect(mockStorage.save).toHaveBeenCalledTimes(1);

        expect(mockStorage.save).toHaveBeenCalledWith(
            fakePhotoRecord.capturedPhotoUri,
            expect.stringContaining(fakePokemon.name)
        );

        expect(mockRepository.save).toHaveBeenCalledTimes(1);


    } );

    //


})