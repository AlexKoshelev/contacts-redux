import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const contactsApiSlice = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1" }),
  endpoints(builder) {
    return {
      getContacts: builder.query<ContactDto[], void>({
        query: () => ({ url: "/befbbfdf-4fbc-479f-bdd6-dc9b02d408bd" }),
      }),
    };
  },
});
export const { useGetContactsQuery } = contactsApiSlice;
export const groupsApiSlice = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1" }),
  endpoints(builder) {
    return {
      getGroups: builder.query<GroupContactsDto[], void>({
        query: () => ({ url: "/6d2c1501-7b9a-4583-a977-27788a4aed47" }),
      }),
    };
  },
});
export const { useGetGroupsQuery } = groupsApiSlice;
interface ContactsParams {
  name: ContactDto["name"];
  groupId: GroupContactsDto["id"];
  contacts: ContactDto[] | undefined;
  groups: GroupContactsDto[] | undefined;
  isLoading: Boolean;
}
interface InitialData {
  contacts: ContactsParams;
  favoritContactsId: FavoriteContactsDto[] | [];
  findContacts: ContactDto[] | [];
}
const initialState: InitialData = {
  contacts: {
    name: "",
    groupId: "",
    contacts: undefined,
    groups: undefined,
    isLoading: true,
  },
  favoritContactsId: [],
  findContacts: [],
};
/* const initialState: InitialData = {
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
}; */
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    filtredContacts(state, action: PayloadAction<ContactsParams>) {
      let findContacts: ContactsParams["contacts"] = state.contacts.contacts;
      const { name, groupId } = action.payload;

      if (name) {
        const fvName = name.toLowerCase();
        findContacts = findContacts?.filter(
          ({ name }) => name.toLowerCase().indexOf(fvName) > -1
        );
      }
      if (groupId && state.contacts.groups) {
        const groupContacts = state.contacts.groups.find(
          ({ id }) => id === groupId
        );

        if (groupContacts) {
          findContacts = findContacts?.filter(({ id }) =>
            groupContacts.contactIds.includes(id)
          );
        }
      }
      if (findContacts) {
        state.findContacts = findContacts;
      }
    },
  },
  extraReducers(builder) {
    // Обрабатываем статус загрузки контактов
    builder.addMatcher(useGetContactsQuery.pending, (state) => {
      state.contacts.isLoading = true;
    });
    builder.addMatcher(useGetContactsQuery.fulfilled, (state) => {
      state.contacts.isLoading = false;
 
    });
    builder.addMatcher(useGetContactsQuery.rejected, (state) => {
      state.contacts.isLoading = false;
    });
  },
  /*   extraReducers: (builder) => {
    builder.addMatcher(
      contactsApiSlice.endpoints.getContacts.matchFulfilled,
      (state, action) => {
        console.log("state", action);

        state.contacts = action.payload;
      }
    );
  }, */
});

export const { filtredContacts } = contactsSlice.actions;
