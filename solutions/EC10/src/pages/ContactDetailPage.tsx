import { Link, useParams, useNavigate } from "react-router";
import type { Contact } from "../models/contact";

interface ContactDetailPageProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

const ContactDetailPage = ({ contacts, onDelete }: ContactDetailPageProps) => {
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

  const handleDelete = () => {
    onDelete(contact.id);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>
        {contact.firstName} {contact.lastName}
      </h1>
      <p>Email : {contact.email}</p>
      <Link to="/">Retour à la liste</Link>
      <button onClick={handleDelete}>Supprimer</button>
      <Link to={`/contacts/${contact.id}/edit`}>Modifier</Link>
    </div>
  );
};

export default ContactDetailPage;