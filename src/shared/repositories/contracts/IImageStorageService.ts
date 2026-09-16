export interface IImageStorageService {
    save(uri: string, name: string): Promise<string>;
    delete(uri: string): Promise<void>;
}