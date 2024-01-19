import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

const BASE_URL = "https://mocki.io/v1";

class Api {
  async fetchContacts(): Promise<ContactDto[]> {
    const response = await fetch(
      `${BASE_URL}/ea80c19a-e244-4d77-8ff7-6a60fc399243`
    );
    const data = await response.json();
    return data;
  }
  async fetchGroups(): Promise<GroupContactsDto[]> {
    const response = await fetch(
      `${BASE_URL}/6f0e2ff2-3f6e-423e-94e2-923b6e523c81`
    );
    const data = await response.json();
    return data;
  }
}
export const api = new Api();
