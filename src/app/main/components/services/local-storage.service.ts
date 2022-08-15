import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    public setItem(key: string, data: any) {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }

    public getItem(key: string) {
        return localStorage.getItem(key);
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }
}