import { useNavigate } from "react-router";
import ContactForm from "../components/ContactForm";
import type { NewContact } from "../models/contact";

interface AddContactPageProps {
  addContact: (newContact: NewContact) => number;
}

const AddContactPage = ({ addContact }: AddContactPageProps) => {
  const navigate = useNavigate();

  const handleAdd = (newContact: NewContact) => {
    const id = addContact(newContact);
    navigate(`/contacts/${id}`);
  };

  return (
    <div>
      <h1>Nouveau contact</h1>
      <ContactForm onSubmit={handleAdd} />
      <button type="button" onClick={() => navigate(-1)}>
        Annuler
      </button>
    </div>
  );
};

export default AddContactPage;