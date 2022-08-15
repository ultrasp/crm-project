export interface IEmployeeLanguageCollection {
  data: IEmployeeLanguage[];
  total_elements: number;
}

export interface IEmployeeLanguage {
  id: number;
  degree: string;
  employee_id: string;
  lang_id: string;
}