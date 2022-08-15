export interface CarCompanyListCollection {
  data: CarCompany[];
  total_elements: number;
}

export interface CarCompany {
  attributes: CompanyAttribute[];
  edit_by: number;
  edit_date: string;
  id: string;
  name: string;
  garaj: string;
  tax_id: string;
  type_id: number;
}

export interface CompanyAttribute {
  edit_by: number;
  edit_date: string;
  id: number;
  company_id: number,
  key: string;
  value: string;
}
