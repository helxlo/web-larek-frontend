# Проектная работа "Веб-ларек"
Проект является примером реализации маркетплейса для разработчиков, с возможностью просмотра, добавления в корзину и приобретения товаров с различной функциональностью.

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

*Базовые классы*

###  Класс `Api`
Базовый класс для работы с API, реализует методы для выполнения HTTP-запросов к переданному базовому URL.

`constructor(baseUrl: string, options: RequestInit = {})`- принимает базовый URL и глобальные опции для всех запросов(опционально).

Методы:
  - `handleResponse` - отрабатывает ответы от сервера, преобразуя их в json и управляя ошибками;
  - `get` - выполняет GET запросы к предоставленному URL;
  - `post` - выполняет запрос к API с использованием предоставленного метода(POST|PUT|DELETE) и предоставленными данными

### Класс `EventEmitter`
Брокер событий: реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.

Класс содержит методы *on, off, emit*  — для подписки на событие, отписки от события и уведомления
подписчиков о наступлении события соответственно.

Дополнительно реализованы методы  *onAll и  offAll*  — для того, чтобы слушать все собития или сбросить все обработчики, а также метод *trigger*, генерирующий событие при вызове.

### Класс `View`
Является абстрактным классом с дженериком, отвечает за отображение данных - инструментарий для работы с DOM в дочерних компонентах.

`constructor(container: HTMLElement)` - принимает элемент контейнера, в который будет помещен компонент.

Методы:
- `toggleClass` - для переключения классов;
- `setDisabled` - изменение статуса блокировки;
- `render` - возвращения корневого элемента

А также защищённые методы:
- `setText` - для установки текстового содержимого;
- `setHidden` - для скрытия элемента;
- `setVisible` - для отображения элемента;
- `setImage` - для установления изображения с альтернативным текстом
- `setPrice` - для добавления фиксированной надписи рядом с изменяющейся ценой 

### Класс `Model`
Представляет собой абстрактный класс, являющийся дженериком. Реализует хранение и изменение данных - базовая модель, чтобы можно было отличить ее от простых объектов с данными.

`constructor(data: Partial<T>, protected events: IEvents)` - принимает данные с опциональным обобщённым типом и события cо специальным типом void, который возвращают функции.

Метод:
`emitChanges` - сообщает об изменениях модели c помощью передаваемого события и опциональной полезной нагрузки.

*Общие классы*

### Класс `Modal`
Отвечает за отрисовку модальных окон с помощью класса *View* и интерфейса *IModalData* с элементом контейнера.

`constructor(container: HTMLElement, protected events: IEvents)` - принимает элемент контейнера, в который будет помещен компонент, а также события со специальным типом void - для нас неважно, что возвращает функция. 

Методы:
- `open` - для открытия модального окна;
- `close` - для закрытия модального окна;
- `render` - для отрисовки модального окна

### Класс `Form`
Получает тип в виде дженерика и реализует отображение формы заполнения данных при заказе с помощью класса *View* и интерфейса *IFormState*, который передаёт данные о валидации формы с булевым типом и данные об ошибках валидации со строчным типом массива.

`constructor(container: HTMLFormElement, protected events: IEvents)` - принимает элемент контейнера, в который будет помещен компонент формы, а также события со специальным типом void - не имеет значение, что возвращает функция.

Методы:
- `onInputChange` - принимающий на вход поля формы и их значения
- `setPaymentMethodActive` - позволяет устанавливать фокус на выбранной кнопке метода оплаты
- set `valid` - для установления валидации форм;
- set `errors` - для установления отображения ошибок ввода;
- `render` - выполняет функцию отрисовки формы

*Компоненты*

### Класс `Page`
Реализует отображение всех компонентов на главной странице приложения с помощью интерфейса *IPage*, который отражает данные о счётчике с числовым типом, о каталоге товаром с массивом DOM-элементов и с локером загрузки с булевым значением.

`constructor(container: HTMLElement, protected events: IEvents)` - принимает элемент контейнера, в который будет помещен компонент, а также события со специальным типом void - для нас неважно, что возвращает функция.

Методы:
- set `counter` - устанавливает счётчик элементов в корзине;
- set `catalog` - отрисовывает каталог;
- set `locked` - управляет состоянием локера на прокрутку страницы во время открытого модального окна

### Класс `Card`
Является дженериком и отвечает за отображение карточки товара на главной странице с помощью класса *View* и интерфейса *ICard* с дженериком, который передаёт информацию об айди, а также о категории, наименовании, описании(опционально) и изображении товара в строчном виде и информацию о цене товара с числовым типом или типом null.

`constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions)` - принимает наименование блока, контейнер с компонентом и опционально действия с типом void - для нас неважно, что вернёт функция.

Методы:
- `setButtonOff` - деактивирует кнопку добавления в корзину и меняет надпись на кнопке;
- `setNullItemOff` - деаактивирует кнопку добавления бесценного товара в корзину;
- set `index` - для установления порядкового номера карточки;
- set `category` - для установления категории товара;
- set `price` - для установления цены товара;
- set `id` - для установления айди карточки;
- set `title` - для установления наименования товара;
- set `image` - для установления изображения карточки;
- set `description` - для установления описания товара;
- get `id` - для получения данных об айди карточки;
- get `title` - для получения данных о наименовании товара;

### Класс `Basket`
Отвечает за отображение корзины с товарами c помощью базового класса *View* и интерфейса *IBasketView*, описывающего данные о товарах как массив DOM-элементов, данные об итоговой сумме заказа с числовым значением и данные о конкретных выбранных товарах в виде массива со строчным типом.

`constructor(container: HTMLElement, protected events: EventEmitter)` - принимает контейнер, содержащий компонент и события со специальным типом void, которые означает, что для нас не имеет значения какой тип вернёт передаваемая функция.

Методы:
- set `items` - для установления массива товаров;
- set `selected` - для установления выбранной кнопки оформления заказа;
- set `total` - для установления итоговой суммы покупки

### Класс `Order`
Отвечает за отрисовку внесённых данных о заказе, реализуется с помощью базового класса *Form* и интерфейса *IOrderForm*, который отражает информацию об электронной почте, адресе и телефоне покупателя в строчном типе, о выбранном способе оплаты с булевым типом и итоговой сумме заказа с числовым значением.

`constructor(container: HTMLFormElement, events: IEvents)` - принимает элемент контейнера, в который будет помещен компонент формы, а также события со специальным типом void - не имеет значение, что возвращает функция.

Методы:
- set `payment` - устанавливает данные о способе оплаты;
- set `address` - устанавливает данные об адресе покупателя;
- set `email` - для установления электронной почты;
- set `phone` - для установления данных о номере телефона;

### Класс `Success`
Реализует отображение модального окна с успешно оформленным заказом с помощью базового класса *View<ISuccess>*. Интерфейс ISeccess отражает итоговую сумму покупки (числовое значение).

`constructor(container: HTMLElement, actions: ISuccessActions)` - принимает контейнер с компонентом и действие (клик по кнопке) с типом void.

Метод:
- `onClick()` - заимствованный у интерфейса, представляет собой слушатель клика по кнопке.

### Класс `AppState`
Отвечает за реализацию модели данных приложения с помощью класса *Model* и интерфейса *IAppState*, который описывает данные о каталоге товаром и корзине, являющиеся массивами, а также информацию о заказе, предаваемую в строчном виде и отображение загружки с типом boolean.

Содержит методы:
- `clearBasket` - очищает корзину с товарами;
- `removeCard` - удаляет конкретный товар из корзины;
- `getTotal` - подсчитывает итоговую сумму покупки;
- `setTotal` - устанавливает итоговую сумму заказа;
- `setBasket` - формирует актуальный перечень товаров в корзине;
- `isInBasket` - проверяет товар на наличие в корзине;
- `setPreview` - открывает модальное окно выбранного товара с подробным описанием и возможностью добавить в корзину;
- `setCatalog` - устанавливает актуальный каталог товаров с сервера;
- `setOrderField` - отслеживает заполнение формы заказа;
- `validateOrder` - валидирует заполненную форму заказа

### Класс `CatalogAPI`
Реализует методы для выполнения HTTP-запросов конкретного приложения Web-larek к переданному базовому URL.

`constructor(cdn: string, baseUrl: string, options: RequestInit)`- принимает строку с конкретными URL данного проекта, базовый URL и глобальные опции для всех запросов(опционально).

Содержит методы:
- `getProductItem` - выполняет GET-запрос для получения конкретного товара из каталога
- `getProductList` - выполняет GET-запрос для получения всех позиций каталога из сервера
- `postOrder` - отвечает за отправку данных о заказе на сервер с помощью POST-запроса

*Ключевые типы данных*

**Данные на главной странице**

interface IAppState {
    catalog: ICard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

**Карточка товара**

interface ICard {
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

**Форма заказа**

interface IOrderForm {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}