import { View } from "../components/base/View";
import { ICard } from "../types/types";
import { ensureElement } from "../utils/utils";
import { AppState } from "./AppState";

interface ICardActions {
    onClick?: (event: MouseEvent) => void;
    onSubmit?: () => void;
    onDelete?: () => void;
}

export class Card extends View<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _price: HTMLElement;

    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _index?: HTMLSpanElement;
    protected _delete_button?: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLTitleElement>(`.${blockName}__title`, container);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = ensureElement<HTMLSpanElement>(`.${blockName}__price`, container);
        this._image = container.querySelector(`.${blockName}__image`);
        this._description = container.querySelector(`.${blockName}__text`);
        this._button = container.querySelector(`.button`);
        this._index = container.querySelector('.basket__item-index');
        this._delete_button = container.querySelector('.basket__item-delete')

        if (this._delete_button) {
            this._delete_button.addEventListener('click', () => {
                actions.onDelete()
            })
        }

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }

        if (this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault();
                actions?.onSubmit()
            })

        }
    }

    set index(value: string) {
        this._index.textContent = value
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set price(value: number) {
        this.setPrice(this._price, value)
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string) {
        this.setText(this._description, value)
    }

}