
export interface IAddressRequest {
    block: string;
    cadas_id: string;
    city_id: string;
    flat: string;
    house: string;
    id: string;
    massiv_id: string;
    note: string;
    region_id: string;
    street_id: string;
    type_id: string;
    street_name:string;
    naspunkt:string;

    setOwnerId(ownerId:string):void;
}

export interface IAddressGetRequest extends IAddressRequest {
    setId(id:string):void;
    setCount(val:number):void;
}