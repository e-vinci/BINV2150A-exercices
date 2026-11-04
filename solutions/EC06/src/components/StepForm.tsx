import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

interface StepFormData {
    firstName: string;
    lastName: string;
    email: string;
    language: string;
    newsletter: boolean;
}

const initialData: StepFormData = {
    firstName: "",
    lastName: "",
    email: "",
    language: "fr",
    newsletter: false,
};

const StepForm = () => {
    const [data, setData] = useState<StepFormData>(initialData);
    const [step, setStep] = useState(0);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleNewsletterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, newsletter: event.target.checked });
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(data);
        setData(initialData);
        setStep(0);
    };

    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <Typography variant="h6">Étape {step + 1} sur 3</Typography>

            {step === 0 && (
                <>
                    <TextField label="Prénom" name="firstName" value={data.firstName} onChange={handleChange} />
                    <TextField label="Nom" name="lastName" value={data.lastName} onChange={handleChange} />
                    <TextField label="Email" name="email" value={data.email} onChange={handleChange} />
                </>
            )}

            {step === 1 && (
                <>
                    <TextField select label="Langue" name="language" value={data.language} onChange={handleChange}>
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="nl">Néerlandais</MenuItem>
                        <MenuItem value="en">Anglais</MenuItem>
                    </TextField>
                    <FormControlLabel
                        control={
                            <Checkbox checked={data.newsletter} onChange={handleNewsletterChange} />
                        }
                        label="Recevoir la newsletter"
                    />
                </>
            )}

            {step === 2 && (
                <>
                    <Typography>Prénom : {data.firstName}</Typography>
                    <Typography>Nom : {data.lastName}</Typography>
                    <Typography>Email : {data.email}</Typography>
                    <Typography>Langue : {data.language}</Typography>
                    <Typography>Newsletter : {data.newsletter ? "Oui" : "Non"}</Typography>
                </>
            )}

            <Stack direction="row" spacing={2}>
                {step > 0 && (
                    <Button type="button" onClick={handlePrevious}>
                        Précédent
                    </Button>
                )}
                {step < 2 && (
                    <Button type="button" variant="contained" onClick={handleNext}>
                        Suivant
                    </Button>
                )}
                {step === 2 && (
                    <Button type="submit" variant="contained">
                        Confirmer
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};

export default StepForm;