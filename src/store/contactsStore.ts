import { makeAutoObservable } from "mobx";
import { api } from "./api";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

interface FilterParams {
  name?: ContactDto["name"];
  groupId?: GroupContactsDto["id"];
}

interface Store {
  contacts: ContactDto[];
  groups: GroupContactsDto[];
  favoriteContacts: ContactDto[];
  findContacts: ContactDto[];
  isLoading: boolean;
  error: string | null;
  filterParams: FilterParams;
  getContacts: () => void;
  getGroups: () => void;
  getFilterContacts: (filterParams: FilterParams) => void;
}

export const store = makeAutoObservable<Store>({
  contacts: [],
  groups: [],
  findContacts: [],
  favoriteContacts: [],
  filterParams: { name: "", groupId: "" },
  isLoading: false,
  error: null,
  *getContacts() {
    store.isLoading = true;
    try {
      const data: ContactDto[] = yield api.fetchContacts();
      if (data) {
        store.contacts = data;
        store.findContacts = store.contacts;
        store.favoriteContacts = data.filter((item, index) => index <= 3);
      } else {
        store.error = "Ошибка загрузки";
      }
    } catch (e: any) {
      if (e) store.error = e.message;
    } finally {
      store.isLoading = false;
    }
  },
  *getGroups() {
    store.isLoading = true;
    try {
      const data: GroupContactsDto[] = yield api.fetchGroups();
      if (data) {
        store.groups = data;
      } else {
        store.error = "Ошибка загрузки";
      }
    } catch (e: any) {
      if (e) store.error = e.message;
    } finally {
      store.isLoading = false;
    }
  },
  getFilterContacts({ name, groupId }: FilterParams) {
    let findContacts = store.contacts;
    if (name) {
      const fvName = name.toLowerCase();
      findContacts = findContacts?.filter(
        ({ name }) => name.toLowerCase().indexOf(fvName) > -1
      );
    }
    if (groupId && store.groups) {
      const groupContacts = store.groups.find(({ id }) => id === groupId);

      if (groupContacts) {
        findContacts = findContacts?.filter(({ id }) =>
          groupContacts.contactIds.includes(id)
        );
      }
    }
    if (findContacts) {
      store.findContacts = findContacts;
    }
  },
});
