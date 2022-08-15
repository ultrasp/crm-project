import { CrmApiUrl } from "src/app/common/enums/crm-api-urls.enum";
import { AbstractCarRequest } from "../../abstract/AbstractCarRequest";
export class CarModelSave extends AbstractCarRequest  {

  id!: string;

  brand_id!: string;

  common_place!: string;

  engine!: string;

  name!: string;

  place_count!: string;

  pure_weight!: string;

  weight!: string;

  type_id!:string;

  constructor() {
    super(CrmApiUrl.CAR_MODEL_SAVE);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getBrandId(): string {
    return this.brand_id;
  }

  public setBrandId(value: string) {
    this.brand_id = value;
  }

  public getCommonPlace(): string {
    return this.common_place;
  }

  public setCommonPlace(value: string) {
    this.common_place = value;
  }

  public getEngine(): string {
    return this.engine;
  }

  public setEnginePower(value: string) {
    this.engine = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getPlaceCount(): string {
    return this.place_count;
  }

  public setPlaceCount(value: string) {
    this.place_count = value;
  }

  public getPureWeight(): string {
    return this.pure_weight;
  }

  public setPureWeight(value: string) {
    this.pure_weight = value;
  }

  public getWeight(): string {
    return this.weight;
  }

  public setWeight(value: string) {
    this.weight = value;
  }
}
