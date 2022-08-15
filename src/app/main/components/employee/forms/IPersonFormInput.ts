import { ObjectOwnerType } from "src/app/common/enums/object-owner-type.enum";

export interface  IDialogPersonFormData{
    id:string ;
    ownerId:string;
    ownerType:ObjectOwnerType;
}

export interface IDialogAddressFormData extends IDialogPersonFormData{
    typeId:string
}