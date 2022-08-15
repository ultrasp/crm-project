export interface JuridicMIPDataResponse{
  data:JuridicMIPData;
  error_code:string;
  message:string;
  status:string;
}
export interface JuridicMIPData {
  account: string;
  address: string;
  date_tin: string;
  fund: number;
  gb_full_name: string;
  gb_pinfl: string;
  gb_tel_home: string;
  gb_tel_work: string;
  gb_tin: string;
  gd_full_name: string;
  gd_pinfl: string;
  gd_tel_home: string;
  gd_tel_work: string;
  gd_tin: string;
  head_pinfl: string;
  mri_code: string;
  na1_code: string;
  na1_name: string;
  name: string;
  name_full: string;
  nc1_code: string;
  nc1_name: string;
  nc2_code: string;
  nc2_name: string;
  nc3_code: string;
  nc3_name: string;
  nc4_code: string;
  nc4_name: string;
  nc5_code: string;
  nc5_name: string;
  nc6_code: string;
  nc6_name: string;
  ns10_code: number;
  ns10_name: string;
  ns11_code: number;
  ns11_name: string;
  ns13_code: string;
  ns13_name: string;
  ns1_code: string;
  ns1_name: string;
  ns2_code: string;
  ns2_name: string;
  ns3_code: string;
  ns3_name: string;
  ns4_code: string;
  ns4_name: string;
  okpo: string;
  reg_date: string;
  reg_num: string;
  state_code: string;
  state_name: string;
  tax_regime: string;
  tin: string;
  tin_head: string;

}