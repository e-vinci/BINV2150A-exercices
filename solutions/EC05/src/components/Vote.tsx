import { useState } from "react";

const Vote = () => {
  const [pour, setPour] = useState(0);
  const [contre, setContre] = useState(0);

  const total = pour + contre;
  const pourcentagePour = total === 0 ? 0 : Math.round((pour / total) * 100);

  return (
    <div>
      <h2>Vote</h2>
      <button onClick={() => setPour((prev) => prev + 1)}>Pour ({pour})</button>
      <button onClick={() => setContre((prev) => prev + 1)}>Contre ({contre})</button>
      <p>Total des votes : {total}</p>
      <p>Pourcentage « Pour » : {pourcentagePour} %</p>
    </div>
  );
};

export default Vote;