export interface Product {
    name: string;
    unit: string;
    price: string;
    quantity: number;
}

export const productData: Array<Product> = [
    {
        name: "Water",
        unit: "1 lt",
        price: "$2",
        quantity: 0
    },
    {
        name: "Earth",
        unit: "1 pc",
        price: "$120",
        quantity: 0
    },
    {
        name: "Fire",
        unit: "1 bl",
        price: "$20",
        quantity: 0
    }    
];