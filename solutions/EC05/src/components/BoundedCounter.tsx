import { useState } from "react";

const MIN = 0;
const MAX = 10;

const BoundedCounter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Compteur borné</h2>
            <p>{count}</p>
            <button onClick={() => setCount((prev) => prev-1)} disabled={count <= MIN}>−1</button>
            <button onClick={() => setCount((prev) => prev + 1)} disabled={count >= MAX}>+1</button>
            <button onClick={() => setCount(0)} disabled={count === MIN}>Remise à zéro</button>
        </div>
    );
};

export default BoundedCounter;