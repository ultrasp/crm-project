export  interface AttributeSetupCollection {
  data: AttributeSetupEntity[];
  total_elements: number;
}

export interface AttributeSetupEntity {
  default_value: string;
  field_type: string;
  id: string;
  key: string;
  name: string;
  order: number;
  readonly: boolean;
  required: boolean;
  security_role: string;
  target: string;
  is_field:boolean;
  group_name:string
}