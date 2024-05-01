import { CardItem } from "../components/AppState";

export interface IModalData {
    content: HTMLElement;
}

export interface IFormState {
    valid?: boolean;
    errors?: string[];
}

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export interface ICard {
    index: number;
    id: string;
    description?: string;
    image?: string;
    title: string;
    category?: string;
    price: number;
    button?: string;
    total: number;
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: HTMLElement[];
}

export interface IAppState {
    catalog: ICard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export interface IOrderForm {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface IOrder extends IOrderForm {
    items?: string[],
    total?: number
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
    id: string;
}