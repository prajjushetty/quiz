export interface MultipartFormData {
    [partName: string]: FormData;
}
export declare type FormData = FileData | FieldData;
export interface FileData {
    type: File;
    filename: string;
    contentType: string;
    content: Buffer | string;
}
export declare type FieldData = string;
export declare type File = "file";
