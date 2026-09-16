import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
import {PhotoRecordDTO} from "../../../../shared/dto/PhotoRecordDTO";
import {IImageStorageService} from "../../../../shared/repositories/contracts/IImageStorageService";
import * as Crypto from 'expo-crypto';
import type {PhotoRecord, Status} from "../../../../shared/models/PhotoRecord";

export type SavePhotoRecordUsecaseResult =
    { success: true, result: PhotoRecord | void } |
    { success: false, errorMessage: string };

export class SavePhotoRecordUsecase {
    constructor(private repository: IPhotoRecordRepository, private storage: IImageStorageService) {}

    async execute(photoRecordDTO: PhotoRecordDTO): Promise<SavePhotoRecordUsecaseResult> {
        const photoRecordName =
            photoRecordDTO.pokemon.name + '_' + photoRecordDTO.pokemon.id + Date.now();

        if (!photoRecordDTO.capturedPhotoUri) {
            return { success: false, errorMessage: 'A foto é obrigatória.' };
        }

        try {
            const uri = await this.storage.save(photoRecordDTO.capturedPhotoUri, photoRecordName);

            const records = await this.repository.findAll();
            const index = records.findIndex(r => r.pokemon.id === photoRecordDTO.pokemon.id);

            if (index === -1) {
                const payload = {
                    id: Crypto.randomUUID(),
                    pokemon: photoRecordDTO.pokemon,
                    capturedPhotoUri: uri,
                    isFavorite: true,
                    creationDate: new Date().toISOString(),
                    status: 'pending' as Status,
                }

                const photoRecord = await this.repository.save(payload)
                return { success: true, result: photoRecord }

            } else {
                const record = records[index];
                if (record.capturedPhotoUri) await this.storage.delete(record.capturedPhotoUri);
                record.capturedPhotoUri = uri

                const photoRecord = await this.repository.update(record.id, record)
                return { success: true, result: photoRecord }
            }

        } catch (error) {
            return { success: false, errorMessage: error instanceof Error ? error.message : "Algo correu mal. Tente novamente" }
        }
    }
}