import {Employee} from "./Employee";


export class EmployeeSearch extends Employee {
  first_name!: string;
  last_name!: string;
  middle_name!: string;
  position_id!: string;
  branch_id!: string;
  branch_id_starts_with!: string;
  from_born_date!: string;
  to_born_date!: string;
  military_id!: string;
  token_id!: string;

  public setFirstName(firstName: string) {
    this.first_name = firstName;
  }
  public getFirstName() {
    return this.first_name;
  }

  public setLastName(lastName: string) {
    this.last_name = lastName;
  }
  public getLastName() {
    return this.last_name;
  }

  public setMiddleName(middleName: string) {
    this.middle_name = middleName;
  }
  public getMiddleName() {
    return this.middle_name;
  }

  public setPositionId(positionId: string) {
    this.position_id = positionId;
  }
  public getPositionId() {
    return this.position_id;
  }

  public setBranchId(branchId: string) {
    this.branch_id = branchId;
  }
  public getBranchId() {
    return this.branch_id;
  }

  public setFromBornDate(bornDate: string) {
    this.from_born_date = bornDate;
  }
  public getFromBornDate() {
    return this.from_born_date;
  }

  public setToBornDate(bornDate: string) {
    this.to_born_date = bornDate;
  }
  public getToBornDate() {
    return this.to_born_date;
  }

  public setMilitaryId(militaryId: string) {
    this.military_id = militaryId;
  }
  public getMilitaryId() {
    return this.military_id;
  }

  public setTokenId(tokenId: string) {
    this.token_id = tokenId;
  }
  public getTokenId() {
    return this.token_id;
  }

  public setBranchIdStartsWith(branchIdStartsWith: string) {
    this.branch_id_starts_with = branchIdStartsWith;
  }

  public getBranchIdStartsWith() {
    return this.branch_id_starts_with;
  }
}
