import type { ReactNode } from "react";

interface InfoBoxProps {
  title: string;
  variant: "info" | "warning";
  children: ReactNode;
}

const InfoBox = ({ title, variant, children }: InfoBoxProps) => {
  return (
    <div className={`info-box info-box-${variant}`}>
      <p className="info-box-title">{title}</p>
      <p>{children}</p>
    </div>
  );
};

export default InfoBox;
