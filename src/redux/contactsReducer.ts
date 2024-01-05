import { DATA_GROUP_CONTACT } from "src/__data__";
import { DATA_CONTACT } from "src/__data__";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import {
  ProjectActions,
  FILTRED_CONTACTS_ACTION,
  FilterParams,
} from "./actions";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
interface initialData {
  contacts: ContactDto[];
  groups: GroupContactsDto[];
  filterParams: FilterParams;
  favoritContactsId: FavoriteContactsDto;
  findContacts: ContactDto[] | [];
}
export function contactsReducer(
  state: initialData = {
    contacts: DATA_CONTACT,
    groups: DATA_GROUP_CONTACT,
    filterParams: { name: "", groupId: "" },
    favoritContactsId: [
      DATA_CONTACT[0].id,
      DATA_CONTACT[1].id,
      DATA_CONTACT[2].id,
      DATA_CONTACT[3].id,
    ],
    findContacts: DATA_CONTACT || [],
  },
  action: ProjectActions
): initialData {
  switch (action.type) {
    case FILTRED_CONTACTS_ACTION:
      let findContacts: ContactDto[] = state.contacts;
      const { name, groupId } = action.payload;
      if (name) {
        const fvName = name.toLowerCase();
        findContacts = findContacts.filter(
          ({ name }) => name.toLowerCase().indexOf(fvName) > -1
        );
      }
      if (groupId) {
        const groupContacts = state.groups.find(({ id }) => id === groupId);

        if (groupContacts) {
          findContacts = findContacts.filter(({ id }) =>
            groupContacts.contactIds.includes(id)
          );
        }
      }

      return {
        ...state,
        filterParams: { name: name || "", groupId: groupId || "" },
        findContacts,
      };
    default:
      return state;
  }
}
