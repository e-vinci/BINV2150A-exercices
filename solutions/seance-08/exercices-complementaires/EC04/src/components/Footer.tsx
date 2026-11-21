const Footer = () => {
  return (
    <footer className="site-footer">
      <div>
        <h2>Horaires</h2>
        <ul className="opening-hours">
          <li className="opening-row opening-row-closed"><span>Lundi</span><span>Fermé</span></li>
          <li className="opening-row"><span>Mardi au vendredi</span><span>12h – 14h, 19h – 22h</span></li>
          <li className="opening-row"><span>Samedi</span><span>19h – 23h</span></li>
          <li className="opening-row"><span>Dimanche</span><span>12h – 15h</span></li>
        </ul>
      </div>
      <div className="contact">
        <h2>Réservations</h2>
        <p>Par téléphone ou sur place</p>
        <p>Groupes à partir de 8 personnes : sur réservation uniquement</p>
      </div>
    </footer>
  );
};

export default Footer;
