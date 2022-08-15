import { AbstractCrmRequest } from "../../abstract/AbstractCrmRequest";

export class HelloWorld extends AbstractCrmRequest {

  value!: string;

  constructor() {
    super("example/hello-world");
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string){
    this.value = value;
  }

}
