import { useState } from "react";
import type { ChangeEvent } from "react";

interface StepData {
  name: string;
  email: string;
  favoriteCategory: string;
  isVegetarian: boolean;
}

const defaultData: StepData = {
  name: "",
  email: "",
  favoriteCategory: "Plat",
  isVegetarian: false,
};

const StepForm = () => {
  const [data, setData] = useState<StepData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateText = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  const updateVegetarian = (event: ChangeEvent<HTMLInputElement>) => {
    setData((oldData) => ({
      ...oldData,
      isVegetarian: event.target.checked,
    }));
  };

  const next = () => {
    setCurrentStep((oldStep) => oldStep + 1);
  };

  const previous = () => {
    setCurrentStep((oldStep) => oldStep - 1);
  };

  const confirm = () => {
    console.log("Données confirmées :", data);
    setData(defaultData);
    setCurrentStep(1);
  };

  return (
    <div>
      <h2>Formulaire à étapes - étape {currentStep} / 3</h2>

      {currentStep === 1 && (
        <div>
          <h3>Informations générales</h3>
          <label>
            Nom
            <input name="name" value={data.name} onChange={updateText} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={data.email} onChange={updateText} />
          </label>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h3>Préférences</h3>
          <label>
            Catégorie préférée
            <select name="favoriteCategory" value={data.favoriteCategory} onChange={updateText}>
              <option value="Entrée">Entrée</option>
              <option value="Plat">Plat</option>
              <option value="Dessert">Dessert</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={data.isVegetarian}
              onChange={updateVegetarian}
            />
            Végétarien
          </label>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h3>Récapitulatif</h3>
          <p>Nom : {data.name}</p>
          <p>Email : {data.email}</p>
          <p>Catégorie préférée : {data.favoriteCategory}</p>
          <p>Végétarien : {data.isVegetarian ? "Oui" : "Non"}</p>
        </div>
      )}

      <div>
        {currentStep > 1 && <button onClick={previous}>Précédent</button>}
        {currentStep < 3 && <button onClick={next}>Suivant</button>}
        {currentStep === 3 && <button onClick={confirm}>Confirmer</button>}
      </div>
    </div>
  );
};

export default StepForm;