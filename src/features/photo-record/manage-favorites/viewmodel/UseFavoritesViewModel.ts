import {PhotoRecord} from "../../../../shared/models/PhotoRecord";
import {Alert} from "react-native";
import {useCallback, useState} from "react";
import {DeletePhotoRecordUsecase} from "../../delete-favorites/usecases/DeletePhotoRecordUsecase";
import {deletePhotoRecordUsecase, getFavoritesUsecase} from "../../composition/PhotoRecordContainer";
import {GetFavoritesUsecase} from "../../get-favorites/usecases/GetFavoritesUsecase";
import {useFocusEffect} from "@react-navigation/native";

const UseFavoritesViewModel = (deleteUsecase: DeletePhotoRecordUsecase = deletePhotoRecordUsecase, getUsecase: GetFavoritesUsecase = getFavoritesUsecase) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [photoRecord, setPhotoRecord] = useState<PhotoRecord[]>([]);

    const loadFavorites = useCallback( async () => {
        setIsLoading(true);
        setErrorMessage(null);

        const result = await getUsecase.execute();

        if (!result.success) {
            setErrorMessage(result.errorMessage);
            setIsLoading(false);

        } else {
            const reversedFavorites = result.result.toReversed();

            setPhotoRecord(reversedFavorites);
            setIsLoading(false);
        }
    }, [getUsecase])

    useFocusEffect(
        useCallback(() => {
            void loadFavorites()

        }, [loadFavorites])
    )

    const handleDelete = async (photoRecord: PhotoRecord): Promise<void> => {
        setErrorMessage(null);

        Alert.alert("Confirmação", "Tem a certeza que pretende apagar este registo dos favoritos?", [
            {text: 'Cancelar', style: 'cancel'},
            {text: 'Apagar', style: 'destructive', onPress: async () => {
                    setIsLoading(true);
                    const result = await deleteUsecase.execute(photoRecord);

                    if (!result.success) {
                        setErrorMessage(result.errorMessage);
                        setIsLoading(false);
                    } else {
                        setPhotoRecord((prev) => prev.filter(r => r.id !== photoRecord.id))
                        Alert.alert("Sucesso", `O Pokemon ${photoRecord.pokemon.name} foi apagado dos favoritos com sucesso!` );

                        setIsLoading(false);
                    }
                }}
        ])
    }

    return {
        isLoading,
        errorMessage,
        photoRecord,
        handleDelete,
    }
}

export default UseFavoritesViewModel;