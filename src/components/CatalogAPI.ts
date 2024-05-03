import { Api, ApiListResponse } from './base/Api';
import { IOrder, ICard, IOrderResult } from "../types/types";

export interface ICatalogAPI {
    getProductList: () => Promise<ICard[]>;
    getProductItem: (id: string) => Promise<ICard>;
    postOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class CatalogAPI extends Api implements ICatalogAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then(
            (item: ICard) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }

}