
/**
 * Menu node data with nested structure.
 * Each node has a caption, and a url or a list of children.
 */
export class MenuNode {
  children!: MenuNode[];
  caption!: string;
  url: any;
  constructor() { }
}