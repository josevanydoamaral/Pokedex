import {useState} from "react";
import {SyncPendingRecordsUsecase} from "../usecases/SyncPendingRecordsUsecase";
import {syncPendingRecordsUsecase} from "../../composition/SyncRecordsContainer";
import {Alert} from "react-native";

const UseSyncRecordsViewModel = (usecase: SyncPendingRecordsUsecase = syncPendingRecordsUsecase) => {
    const [syncing, setSyncing] = useState(false);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const result = await usecase.execute();
            Alert.alert(
                'Estado de sincronização',
                result.message,
                [{text: 'OK'}]
            );
        } finally {
            setSyncing(false);
        }
    }

    return {
        syncing,
        handleSync,
    }
}

export default UseSyncRecordsViewModel;