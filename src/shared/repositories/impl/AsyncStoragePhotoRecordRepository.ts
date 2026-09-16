import {IPhotoRecordRepository} from "../contracts/IPhotoRecordRepository";
import {PhotoRecord} from "../../models/PhotoRecord";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PHOTO_RECORDS = "photoRecords";

export class AsyncStoragePhotoRecordRepository implements IPhotoRecordRepository  {
    async findAll(): Promise<PhotoRecord[]> {
        try {
            const data = await AsyncStorage.getItem(PHOTO_RECORDS);
            return data !== null ? JSON.parse(data) as PhotoRecord[] : [];
        } catch (e) {
            throw new Error("Erro ao ler registos locais.")
        }
    }

    async findById(id: string): Promise<PhotoRecord | null> {
        try {
            const data = await this.findAll();
            const record = data.find(r => r.id === id);

            return record ? record : null;

        } catch (e) {
            throw new Error("Erro ao ler este registo.")
        }
    }

    async save(photoRecord: PhotoRecord): Promise<PhotoRecord> {
        try {
            const savedPhotoRecord = await this.findAll();
            const updatedPhotoRecord = [...savedPhotoRecord, photoRecord];

            await AsyncStorage.setItem(PHOTO_RECORDS, JSON.stringify(updatedPhotoRecord));
            return photoRecord;

        } catch (e) {
            throw new Error("Erro ao salvar este registo.")
        }
    }

    async update(id: string, record: Partial<PhotoRecord>): Promise<void> {
        try {
            let records = await this.findAll();
            const index = records.findIndex(r => r.id === id);

            if (index !== -1) {
                records[index] = {...records[index], ...record};
                await AsyncStorage.setItem(PHOTO_RECORDS, JSON.stringify(records));
            }

        } catch (e) {
            throw (e instanceof Error ? "Registo não encontrado": new Error("Erro ao salvar este registo."));
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const records = await this.findAll();
            const newRecords = records.filter(r => r.id !== id);

            await AsyncStorage.setItem(PHOTO_RECORDS, JSON.stringify(newRecords));

        } catch (e) {
            throw new Error("Erro ao apagar este registo.")
        }
    }

    async findPending(): Promise<PhotoRecord[]> {
        try {
            const records = await this.findAll();
            return records.filter(r => r.status === 'pending');
        } catch (e) {
            throw new Error("Erro ao encotrar registos por sincronizar")
        }
    }


}