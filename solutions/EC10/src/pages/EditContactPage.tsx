import { Link, useNavigate, useParams } from "react-router";
import ContactForm from "../components/ContactForm";
import type { Contact, NewContact } from "../models/contact";

interface EditContactPageProps {
  contacts: Contact[];
  onUpdate: (id: number, data: NewContact) => void;
}

const EditContactPage = ({ contacts, onUpdate }: EditContactPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find((c) => c.id === Number(id));

  if (!contact) {
    return (
      <div>
        <p>Contact introuvable</p>
        <Link to="/">Retour à la liste</Link>
      </div>
    );
  }

  const handleSubmit = (data: NewContact) => {
    onUpdate(contact.id, data);
    navigate(`/contacts/${contact.id}`);
  };

  return (
    <div>
      <h1>Modifier le contact</h1>
      <ContactForm
        key={contact.id}
        initialValues={{
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
        }}
        submitLabel="Enregistrer"
        onSubmit={handleSubmit}
      />
      <button type="button" onClick={() => navigate(-1)}>
        Annuler
      </button>
    </div>
  );
};

export default EditContactPage;