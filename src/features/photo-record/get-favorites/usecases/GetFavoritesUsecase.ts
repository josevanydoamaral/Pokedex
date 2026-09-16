import {IPhotoRecordRepository} from "../../../../shared/repositories/contracts/IPhotoRecordRepository";
import {PhotoRecord} from "../../../../shared/models/PhotoRecord";

type GetFavoritesUsecaseResult =
    { success: true, result: PhotoRecord[] } |
    { success: false, errorMessage: string }

export class GetFavoritesUsecase {
    constructor(private repository: IPhotoRecordRepository) {}

    async execute(): Promise<GetFavoritesUsecaseResult> {
        try {
            const result = await this.repository.findAll();

            return { success: true, result: result };

        } catch (error) {
            return {
                success: false,
                errorMessage: error instanceof Error
                    ? error.message : 'Erro ao buscar registo de Pokemons favoritos'
            };
        }
    }
}