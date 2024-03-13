export interface CardData {
    id: string;
    description?: string;
    image: string;
    title: string;
    category: string;
    price: number | null; 
}

export interface UserData {
    payment: boolean;
    email: string;
    phone: string;
    address: string;
    total: number;
}

export interface IAppState {
    catalog: CardData[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export interface IOrder extends UserData {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;