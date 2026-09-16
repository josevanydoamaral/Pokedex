import {IImageStorageService} from "../../../../shared/repositories/contracts/IImageStorageService";
import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
import {PhotoRecord} from "../../../../shared/models/PhotoRecord";

type DeletePhotoRecordUsecaseResult =
    { success: true, message: string } |
    { success: false, errorMessage: string }

export class DeletePhotoRecordUsecase {
    constructor(private storage: IImageStorageService, private repository: IPhotoRecordRepository){}

    async execute(photoRecord: PhotoRecord): Promise<DeletePhotoRecordUsecaseResult> {
        try {
            await this.repository.delete(photoRecord.id);

            if (photoRecord.capturedPhotoUri) {
                await this.storage.delete(photoRecord.capturedPhotoUri);
            }

            return { success: true, message: `Registo apagado com sucesso: ${photoRecord.id}` };

        } catch (error) {
            return {
                success: false,
                errorMessage: error instanceof Error
                    ? error.message : "Algo correu mal! Tente novamente."
            };
        }
    }
}