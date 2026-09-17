import {PhotoRecord} from "../../models/PhotoRecord";

export interface ISyncPendingRecordsRepository {
    syncRecord: (record: PhotoRecord) => Promise<PhotoRecord>;
}