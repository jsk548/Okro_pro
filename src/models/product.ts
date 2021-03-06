import { ProductType } from "./ProductType";

export interface Product {
    id: number;
    name: string;
    unit: string;
    price: string;
    quantity: number;
    category: ProductType;
}

export const productData: Array<Product> = [
    {
        id: 1,
        name: "Water",
        unit: "1 lt",
        price: "$2",
        quantity: 0,
        category: ProductType.Category1
    },
    {
        id: 2,
        name: "Earth",
        unit: "1 pc",
        price: "$120",
        quantity: 0,
        category: ProductType.Category2
    },
    {
        id: 3,
        name: "Fire",
        unit: "1 bl",
        price: "$20",
        quantity: 0,
        category: ProductType.Category3
    }
];