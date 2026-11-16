import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type { RegisterData } from "../models/user";

interface RegisterPageProps {
  onRegister: (data: RegisterData) => Promise<void>;
}

const RegisterPage = ({ onRegister }: RegisterPageProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterData>({ email: "", password: "", firstName: "", lastName: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onRegister(form);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          Nom
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mot de passe
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
};

export default RegisterPage;
