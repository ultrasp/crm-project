export interface OnSave {
    beforeSave(): void;
    saveCallback(result: Object): void;
    errorCallback(error: Object): void;
    afterSave(): void;
}