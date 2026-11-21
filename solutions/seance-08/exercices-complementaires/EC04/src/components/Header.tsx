interface HeaderProps {
  name: string;
  tagline: string;
  address: string;
}

const Header = ({ name, tagline, address }: HeaderProps) => {
  return (
    <header className="site-header">
      <h1>{name}</h1>
      <p className="tagline">{tagline}</p>
      <p className="address">{address}</p>
    </header>
  );
};

export default Header;
