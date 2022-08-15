export interface IMipAddressCollection {
  data: MipAddress,
  error_code: string;
  message: string;
  status: number;
  ok: boolean;
}

export interface MipAddress {
  answere_comment: string;
  answere_id: number;
  answere_message: string;
  data: MipAddresType
}

export interface MipAddresType {
  permanent_registration: MipAddressPermanentRegistration;
  temproary_registrations: MipAddressTemproaryRegistration;
}

export interface MipAddressPermanentRegistration {
  address: string;
  cadastre: string;
  country: MipAddressData;
  district: MipAddressData;
  region: MipAddressData;
  registration_date: string;
}

export interface MipAddressTemproaryRegistration {
  address: string;
  cadastre: string;
  country: MipAddressData;
  district: MipAddressData;
  region: MipAddressData;
  date_from: string;
  date_till: string;
}

export interface MipAddressData {
  id: number;
  id_value: string;
  value: string;
}

export interface IMipAddressConverted {
  address: string;
  cadastre: string;
  country: number;
  region: number;
  district: number;
}
