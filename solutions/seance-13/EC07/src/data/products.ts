export interface Product {
    id: number;
    name: string;
    price: number;
}

export const products: Product[] = [
    { id: 1, name: "Sac à dos", price: 34.9 },
    { id: 2, name: "Gourde", price: 12.5 },
    { id: 3, name: "Carnet", price: 8.75 },
    { id: 4, name: "Lampe de bureau", price: 26.99 },
    { id: 5, name: "Trousse", price: 9.5 },
];