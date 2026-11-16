import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Touched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const initialData: SignupData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const initialTouched: Touched = {
  email: false,
  password: false,
  confirmPassword: false,
};

const SignupForm = () => {
  const [form, setForm] = useState<SignupData>(initialData);
  const [touched, setTouched] = useState<Touched>(initialTouched);

  const emailError = !form.email.includes("@");
  const passwordError = form.password.length < 8 || !/\d/.test(form.password);
  const confirmError = form.confirmPassword !== form.password;
  const isValid = !emailError && !passwordError && !confirmError;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    console.log("Inscription :", form.email);
    setForm(initialData);
    setTouched(initialTouched);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <div>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        {touched.email && emailError && <p style={{ color: "red" }}>L'email doit contenir @</p>}
      </div>
      <div>
        <label>
          Mot de passe
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </label>
        {touched.password && passwordError && (
          <p style={{ color: "red" }}>Au moins 8 caractères, dont un chiffre</p>
        )}
      </div>
      <div>
        <label>
          Confirmation du mot de passe
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </label>
        {touched.confirmPassword && confirmError && (
          <p style={{ color: "red" }}>Les mots de passe ne correspondent pas</p>
        )}
      </div>
      <button type="submit" disabled={!isValid}>
        S'inscrire
      </button>
    </form>
  );
};

export default SignupForm;