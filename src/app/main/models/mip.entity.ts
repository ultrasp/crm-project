export interface MipDataCollection {
  data: MipData,
  error_code: string;
  message: string;
  status: number;
}

export interface MipData {
  birth_country: string;
  birth_country_id: number;
  birth_date: string;
  birth_place: string;
  birth_place_id: number;
  citizenship: string;
  citizenship_id: number;
  date_begin_document: string;
  date_end_document: string;
  doc_give_place: string;
  doc_giveplace_id: number;
  document: string;
  livestatus: number;
  name_engl: string;
  name_latin: string;
  nationality: string;
  nationality_id: number;
  patronym_latin: string;
  sex: number;
  surname_engl: string;
  surname_latin: string;
  pinfl:string
}

export interface IConvertedMipData{
  birth_country: string;
  birth_country_id: number;
  birth_date: Date | null;
  birth_place: string;
  birth_place_id: number;
  citizenship: string;
  citizenship_id: number;
  date_begin_document: Date | null;
  date_end_document: Date | null;
  doc_give_place: string;
  doc_giveplace_id: number;
  document: string;
  livestatus: number;
  name_engl: string;
  name_latin: string;
  nationality: string;
  nationality_id: number;
  patronym_latin: string;
  sex: number;
  surname_engl: string;
  surname_latin: string;
  pinfl:string
}