import { useState } from "react";
import { Route, Routes } from "react-router";
import { contacts as initialContacts } from "./data/contacts";
import type { Contact, NewContact } from "./models/contact";
import ContactListPage from "./pages/ContactListPage";
import ContactDetailPage from "./pages/ContactDetailPage";
import AddContactPage from "./pages/AddContactPage";
import EditContactPage from "./pages/EditContactPage";


const App = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const addContact = (newContact: NewContact): number => {
    const id = Date.now();
    const contact: Contact = { ...newContact, id };
    setContacts([...contacts, contact]);
    return id;
  };

  const updateContact = (id: number, data: NewContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, ...data } : contact
      )
    );
  };
  return (
    <Routes>
      <Route path="/" element={<ContactListPage contacts={contacts} />} />
      <Route path="contacts/:id" element={<ContactDetailPage contacts={contacts} onDelete={deleteContact} />} />
      <Route path="contacts/new" element={<AddContactPage addContact={addContact} />} />
      <Route
        path="contacts/:id/edit"
        element={<EditContactPage contacts={contacts} onUpdate={updateContact} />}
      />
    </Routes>
  );
};

export default App;