import { savePhotoRecordUsecase } from "../../composition/PhotoRecordContainer";
import {SavePhotoRecordUsecase} from "../usecases/SavePhotoRecordUsecase";
import {useState} from "react";
import {Pokemon} from "../../../../shared/models/Pokemon";
import {launchCameraAsync, requestCameraPermissionsAsync} from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";
import {Alert, Linking} from "react-native";

const useSavePhotoRecordViewModel = (usecase: SavePhotoRecordUsecase = savePhotoRecordUsecase) => {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [capturedPhotoUri, setCapturedPhotoUri] = useState<string>("");



    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    const clearPhoto = () => {
        setCapturedPhotoUri("")
    }

    const takePhoto = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const permission = await requestCameraPermissionsAsync();

            if (!permission.granted) {
                if (!permission.canAskAgain) {
                    Alert.alert(
                        'Permissão negada',
                        'Para poder tirar a foto, precisa dar permissão a câmera',
                        [
                            { text: 'Não permitir', style: 'cancel' },
                            { text: 'Permitir', onPress: () => Linking.openSettings() }
                        ]
                    )
                    return;
                }

                setErrorMessage("Permissão negada.")
                setIsLoading(false);
                return;
            }


            const result = await launchCameraAsync({
                aspect: [4, 3],
                allowsEditing: true,
                mediaTypes: ['images'],
                quality: 0.7,

            })


            if (!result.canceled) {
                setCapturedPhotoUri(result.assets[0].uri);
            }

        } catch {
            setErrorMessage("Câmera do dispositivo indisponível.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSavePhotoRecord = async (pokemon: Pokemon) => {
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const photoRecordDTO = {
            capturedPhotoUri,
            pokemon,
        }

        const result = await usecase.execute(photoRecordDTO);

        if (result.success) {
            setSuccessMessage("Foto salva com sucesso.");

            Alert.alert("Sucesso", "Foto salva com sucesso.", [{
                text: 'OK',
                onPress: () => navigation.navigate('Home')}
            ]);
            return;

        } else {
            setErrorMessage(result.errorMessage);
        }

        setIsLoading(false);
    }

    return {
        isLoading,
        errorMessage,
        successMessage,
        isFavorite,
        capturedPhotoUri,
        handleToggleFavorite,
        handleSavePhotoRecord,
        takePhoto
    }
}
export default useSavePhotoRecordViewModel