import {IImageStorageService} from "../shared/repositories/contracts/IImageStorageService";
import { documentDirectory } from "expo-file-system/legacy";
import {Directory, File, Paths} from "expo-file-system";

export class ExpoImageStorageService implements IImageStorageService {

    async save(uri: string, name: string): Promise<string> {
        try {
            const folder = new Directory(Paths.document, 'photos');


            if (!folder.exists) {
                folder.create();
            }



            const finalFile = new File(folder, name + '.jpg');

            const file = new File(uri);
            await file.copy(finalFile);

            return finalFile.uri;

        } catch (error) {
            console.error(error instanceof  Error ? error.message : 'Erro no serviço de armazenamento');
            throw new Error("Erro ao copiar ficheiro.");
        }


    }

    async delete(uri: string): Promise<void> {
        const file = new File(uri);

        if (file.exists) {
            try {
                file.delete();
            } catch {
                throw new Error("Erro ao apagar o ficheiro.");
            }
        }

    }

}