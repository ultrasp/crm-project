export interface IEmployeeAttachmentCollection {
  data: IEmployeeAttachment[];
  total_elements: number;
}

export interface IEmployeeAttachment {
  content_type: string,
  edit_by: number,
  edit_date: string,
  file_name: string,
  file_size: number,
  id: number,
  name: string,
  owner_id: number,
  type_id: number
}
