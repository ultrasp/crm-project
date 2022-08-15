export interface OnDelete {
    beforeDelete(): void;
    afterDelete(): void;
}