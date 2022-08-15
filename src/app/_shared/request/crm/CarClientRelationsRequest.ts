import {CarClientRelationList} from "./CarClientRelationList";

export class CarClientRelationOwnerClient extends CarClientRelationList {

  override setOwnerId(ownerId: string): void {
    this.client_id = ownerId;
  }

}
