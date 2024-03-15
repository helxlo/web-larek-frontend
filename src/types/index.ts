export interface IModalData {
    content: HTMLElement;
}

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export interface ICard<T> {
    id: string;
    description?: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export interface IAppState {
    catalog: ICard<[]>;
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export interface IOrderForm {
    payment: boolean;
    email: string;
    phone: string;
    address: string;
    total: number;
}

export interface IOrder extends IOrderForm {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;