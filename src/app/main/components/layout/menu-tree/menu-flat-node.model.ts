/** Flat node with expandable and level information */
export class MenuFlatNode {
  constructor(
    public expandable: boolean, public caption: string, public level: number, public url: string) { }
}