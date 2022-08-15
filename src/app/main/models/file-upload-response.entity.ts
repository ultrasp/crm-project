export interface IFileUpload {
    data: IFileUploadData;
    error_code: number;
    message: string;
    status: number;
}

export interface IFileUploadData {
    content_type: string;
    edit_by: number;
    edit_date: string;
    file_name: string;
    file_size: number;
    id: number;
    name: string;
    owner_id: number;
    type_id: number;
}