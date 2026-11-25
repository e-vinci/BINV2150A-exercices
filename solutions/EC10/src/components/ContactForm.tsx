import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { NewContact } from "../models/contact";

interface ContactFormProps {
    initialValues?: NewContact; 
    submitLabel?: string;
    onSubmit: (contact: NewContact) => void;
}

const emptyForm: NewContact = { firstName: "", lastName: "", email: "" };

const ContactForm = ({ initialValues = emptyForm, submitLabel = "Ajouter", onSubmit }: ContactFormProps) => {
    const [form, setForm] = useState<NewContact>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Prénom{" "}
                    <input name="firstName" value={form.firstName} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Nom{" "}
                    <input name="lastName" value={form.lastName} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Email{" "}
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">{submitLabel}</button>
        </form>
    );
};

export default ContactForm;