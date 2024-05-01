import { View } from "../components/base/View";
import { IBasketView } from "../types/types";
import { createElement, ensureElement, formatNumber } from "../utils/utils";
import { EventEmitter } from "../components/base/events";

export class Basket extends View<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;
    protected _delete: HTMLButtonElement;
    protected _index: HTMLSpanElement;
    protected _items: HTMLElement[];

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items)
            this.setDisabled(this._button, false)
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.setDisabled(this._button, true);
        }
    }

    set selected(items: HTMLElement[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setPrice(this._total, formatNumber(total));
    }

}