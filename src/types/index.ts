interface CardDara {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; 
}

interface UserData {
    payment: boolean;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}