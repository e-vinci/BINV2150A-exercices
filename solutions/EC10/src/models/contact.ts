export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type NewContact = Omit<Contact, "id">;