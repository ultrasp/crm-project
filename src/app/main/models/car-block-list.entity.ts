export interface CarBlockCollection {
  data: CarBlock[];
  total_elements: number;
}

export interface CarBlock {
  car_id: number;
  block_date: string;
  block_number: string;
  blocker_company: string;
  blocker_person: string;
  state_id: number;
  unblock_date: string;
  unblocker_company: string;
  unblocker_person: string;

}
