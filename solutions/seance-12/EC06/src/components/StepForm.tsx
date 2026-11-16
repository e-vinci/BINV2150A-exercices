import { useState } from "react";
import type { ChangeEvent } from "react";

interface StepData {
  name: string;
  email: string;
  favoriteCategory: string;
  isVegetarian: boolean;
}

const initialData: StepData = {
  name: "",
  email: "",
  favoriteCategory: "Plat",
  isVegetarian: false,
};

const StepForm = () => {
  const [data, setData] = useState<StepData>(initialData);
  const [step, setStep] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleConfirm = () => {
    console.log("Confirmé :", data);
    setData(initialData);
    setStep(1);
  };

  return (
    <div>
      <h2>Formulaire à étapes — étape {step} / 3</h2>

      {step === 1 && (
        <div>
          <h3>Informations générales</h3>
          <label>
            Nom
            <input name="name" value={data.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={data.email} onChange={handleChange} />
          </label>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Préférences</h3>
          <label>
            Catégorie préférée
            <select name="favoriteCategory" value={data.favoriteCategory} onChange={handleChange}>
              <option value="Entrée">Entrée</option>
              <option value="Plat">Plat</option>
              <option value="Dessert">Dessert</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={data.isVegetarian}
              onChange={(e) => setData({ ...data, isVegetarian: e.target.checked })}
            />
            Végétarien
          </label>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Récapitulatif</h3>
          <p>Nom : {data.name}</p>
          <p>Email : {data.email}</p>
          <p>Catégorie préférée : {data.favoriteCategory}</p>
          <p>Végétarien : {data.isVegetarian ? "Oui" : "Non"}</p>
        </div>
      )}

      <div>
        {step > 1 && <button onClick={() => setStep((prev) => prev - 1)}>Précédent</button>}
        {step < 3 && <button onClick={() => setStep((prev) => prev + 1)}>Suivant</button>}
        {step === 3 && <button onClick={handleConfirm}>Confirmer</button>}
      </div>
    </div>
  );
};

export default StepForm;