import { useState } from "react";
import type { ChangeEvent,SubmitEvent } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface TouchedFields {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
};

const initialForm: SignupFormData = {
    email: "",
    password: "",
    confirmPassword: "",
};

const initialTouched: TouchedFields = {
    email: false,
    password: false,
    confirmPassword: false,
}

const SignupForm = () => {
    const [form, setForm] = useState<SignupFormData>(initialForm);
    const [touched, setTouched] = useState<TouchedFields>(initialTouched);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setTouched({ ...touched, [name]: true });
    };

    const emailError = !form.email.includes("@");
    const passwordError = form.password.length < 8 || !/\d/.test(form.password);
    const confirmError = form.confirmPassword !== form.password;

    const isValid = !emailError && !passwordError && !confirmError;

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValid) return;

        console.log({ email: form.email, password: form.password });

        setForm(initialForm);
        setTouched(initialTouched);
    };

    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={touched.email && emailError}
                helperText={touched.email && emailError ? "L'email doit contenir @" : ""}
            />
            <TextField
                label="Mot de passe"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={touched.password && passwordError}
                helperText={
                    touched.password && passwordError
                        ? "Au moins 8 caractères, dont un chiffre"
                        : ""
                }
            />
            <TextField
                label="Confirmation du mot de passe"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && confirmError}
                helperText={
                    touched.confirmPassword && confirmError
                        ? "Les mots de passe ne correspondent pas"
                        : ""
                }
            />
            <Button type="submit" variant="contained" disabled={!isValid}>
                S'inscrire
            </Button>
        </Stack>
    );
};

export default SignupForm;