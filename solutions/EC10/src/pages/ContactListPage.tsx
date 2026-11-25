import { Link, useSearchParams } from "react-router";
import type { Contact } from "../models/contact";

interface ContactListPageProps {
  contacts: Contact[];
}

const ContactListPage = ({ contacts }: ContactListPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const handleSearch = (value: string) => {
    setSearchParams(value === "" ? {} : { q: value }, { replace: true });
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Carnet de contacts</h1>
      <Link to="/contacts/new">Ajouter un contact</Link>

      <div>
        <input
          type="search"
          placeholder="Rechercher un contact"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {filteredContacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contacts/${contact.id}`}>
                {contact.firstName} {contact.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactListPage;