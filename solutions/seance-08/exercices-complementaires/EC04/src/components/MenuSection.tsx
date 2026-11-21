import type { ReactNode } from "react";

interface MenuSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const MenuSection = ({ title, subtitle, children }: MenuSectionProps) => {
  return (
    <section className="menu-section">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
};

export default MenuSection;
