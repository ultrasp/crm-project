export interface ICarModelCollection {
  data: ICarModel[];
  total_elements: number;
}

export interface ICarModel {
  id: string;
  brand_id: string;
  common_place: string;
  engine: string;
  name: string;
  place_count: string;
  pure_weight: string;
  weight: string;
  type_id:string;
}
