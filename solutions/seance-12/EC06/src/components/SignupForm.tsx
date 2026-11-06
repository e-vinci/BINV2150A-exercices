import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

const emptyForm: SignupData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [form, setForm] = useState<SignupData>(emptyForm);
  const [edited, setEdited] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailOk = form.email.includes("@");
  const passwordOk = form.password.length >= 8 && /\d/.test(form.password);
  const confirmationOk =
    form.confirmPassword.length > 0 && form.confirmPassword === form.password;
  const formOk = emailOk && passwordOk && confirmationOk;

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof SignupData;
    const value = event.target.value;

    setForm((oldForm) => ({ ...oldForm, [field]: value }));
    setEdited((oldEdited) => ({ ...oldEdited, [field]: true }));
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formOk) {
      console.log("Inscription :", form.email);
      setForm(emptyForm);
      setEdited({
        email: false,
        password: false,
        confirmPassword: false,
      });
    }
  };

  return (
    <form onSubmit={submitForm}>
      <h2>Inscription</h2>
      <div>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={changeField} />
        </label>
        {edited.email && !emailOk && <p style={{ color: "red" }}>L'email doit contenir @</p>}
      </div>
      <div>
        <label>
          Mot de passe
          <input type="password" name="password" value={form.password} onChange={changeField} />
        </label>
        {edited.password && !passwordOk && (
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
            onChange={changeField}
          />
        </label>
        {edited.confirmPassword && !confirmationOk && (
          <p style={{ color: "red" }}>Les mots de passe ne correspondent pas</p>
        )}
      </div>
      <button type="submit" disabled={!formOk}>
        S'inscrire
      </button>
    </form>
  );
};

export default SignupForm;