import { CrmApiUrl } from "../../../common/enums/crm-api-urls.enum";
import { AbstractCarSearchRequest } from "../../abstract/AbstractCarSearchRequest";

export class Car extends AbstractCarSearchRequest {

  id!: string;

  body_number!: string;

  body_type_id!: string;

  brand_id!: string;

  chassis_number!: string;

  color_id!: string;

  country_id!: string;

  engine_number!: string;

  fuel_type_id!: string;

  model_id!: string;

  type_id!: string;

  vin_code!: string;

  year!: string;


  constructor() {
    super(CrmApiUrl.CAR_LIST);
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getBodyNumber() : string {
    return this.body_number;
  }

  public setBodyNumber(value: string) {
    this.body_number = value;
  }

  public getBodyTypeId() : string {
    return this.body_type_id;
  }

  public setBodyTypeId(value: string) {
    this.body_type_id = value;
  }

  public getBrandId() : string {
    return this.brand_id;
  }

  public setBrandId(value: string) {
    this.brand_id = value;
  }

  public getChassisNumber() : string {
    return this.chassis_number;
  }

  public setChassisNumber(value: string) {
    this.chassis_number = value;
  }

  public getColorId() : string {
    return this.color_id;
  }

  public setColorId(value: string) {
    this.color_id = value;
  }

  public getCountryId() : string {
    return this.country_id;
  }

  public setCountryId(value: string) {
    this.country_id = value;
  }

  public getEngineNumber() : string {
    return this.engine_number;
  }

  public setEngineNumber(value: string) {
    this.engine_number = value;
  }

  public getFuelTypeId() : string {
    return this.fuel_type_id;
  }

  public setFuelTypeId(value: string) {
    this.fuel_type_id = value;
  }

  public getModelId() : string {
    return this.model_id;
  }

  public setModelId(value: string) {
    this.model_id = value;
  }

  public getTypeId() : string {
    return this.type_id;
  }

  public setTypeId(value: string) {
    this.type_id = value;
  }

  public getVinCode() : string {
    return this.vin_code;
  }

  public setVinCode(value: string) {
    this.vin_code = value;
  }

  public getYear() : string {
    return this.year;
  }

  public setYear(value: string) {
    this.year = value;
  }
}
