import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const FILTRED_CONTACTS_ACTION = "FILTRED_CONTACTS_ACTION";
export interface FilterParams {
  name: ContactDto["name"];
  groupId: GroupContactsDto["id"];
}
interface filtredAction {
  type: typeof FILTRED_CONTACTS_ACTION;
  payload: FilterParams;
}

export function filtredActionCreator(
  name: ContactDto["name"],
  groupId: GroupContactsDto["id"]
): filtredAction {
  return { type: FILTRED_CONTACTS_ACTION, payload: { name, groupId } };
}

export type ProjectActions = filtredAction;
