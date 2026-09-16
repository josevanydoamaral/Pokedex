import {PhotoRecord} from "../../models/PhotoRecord";

export interface IPhotoRecordRepository {
    findAll: () => Promise<PhotoRecord[]>;
    findById: (id: string) => Promise<PhotoRecord | null>;
    save: (photoRecord: PhotoRecord) => Promise<PhotoRecord>;
    update: (id: string, record: Partial<PhotoRecord>) => Promise<void>;
    delete: (id: string) => Promise<void>;
    findPending: () => Promise<PhotoRecord[]>;
}