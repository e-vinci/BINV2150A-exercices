export interface Product {
    id: number;
    name: string;
    price: number;
}

export const products: Product[] = [
    { id: 1, name: "Clavier", price: 49.9 },
    { id: 2, name: "Souris", price: 24.5 },
    { id: 3, name: "Écran", price: 189 },
    { id: 4, name: "Casque", price: 79.99 },
    { id: 5, name: "Webcam", price: 39 },
];