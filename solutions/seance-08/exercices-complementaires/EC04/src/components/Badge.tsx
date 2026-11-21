interface BadgeProps {
  label: string;
  type: "veggie" | "new" | "spicy";
}

const Badge = ({ label, type }: BadgeProps) => {
  return <span className={`badge badge-${type}`}>{label}</span>;
};

export default Badge;
