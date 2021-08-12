export const FETCH_DATA = "FETCH_DATA";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const SET_FILTER_ITEMS = "SET_FILTER_ITEMS";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
export const SET_COUNT_ITEMS_CART = "SET_COUNT_ITEMS_CART";
export const SET_ORDER = "SET_ORDER";
export const CLEAR_CART = "CLEAR_CART";
export const INPUT_RESET = "INPUT_RESET";

export const initialState = {
    inputReset: false,
    items: null,
    categories: null,
    activeCategory: null,
    filterItems: null,
    totalPrice: 0,
    countItemsCart: 0,
    order: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                items: action.payload,
            };
        case SET_CATEGORIES:
            let result = [];
            if (state.items) {
                state.items.forEach((i) => {
                    const obj = {
                        name: i.rname,
                        id: i.rid,
                        url: i.urlalias,
                    };
                    if (obj.name && obj.id && obj.url) {
                        result.push(obj);
                    }
                });
            }
            return {
                ...state,
                categories: result,
            };
        case SET_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload,
            };
        case SET_FILTER_ITEMS:
            return {
                ...state,
                filterItems: action.payload,
            };
        case SET_TOTAL_PRICE:
            if (state.order && state.order.length >= 1) {
                const price = state.order.reduce((accum, i) => {
                    return accum + i.countPrice;
                }, 0);
                return {
                    ...state,
                    totalPrice: price,
                };
            } else {
                return {
                    ...state,
                    totalPrice: 0,
                };
            }
        case SET_ORDER:
            const obj = action.payload;
            const newObj = {
                ...obj,
                countPrice: obj.price * obj.count,
            };
            const index = state.order.findIndex((i) => i.id === newObj.id);

            if (index < 0 && newObj.count === 0) {
                return {
                    ...state,
                    order: [...state.order],
                };
            }
            if (index >= 0 && newObj.count === 0) {
                return {
                    ...state,
                    order: [...state.order.slice(0, index), ...state.order.slice(index + 1)],
                };
            }
            if (index >= 0) {
                return {
                    ...state,
                    order: [...state.order.slice(0, index), newObj, ...state.order.slice(index + 1)],
                };
            } else {
                return {
                    ...state,
                    order: [...state.order, newObj],
                };
            }
        case SET_COUNT_ITEMS_CART:
            if (state.order && state.order.length >= 1) {
                const count = state.order.reduce((accum, i) => {
                    return accum + +i.count;
                }, 0);
                return {
                    ...state,
                    countItemsCart: count,
                };
            } else {
                return {
                    ...state,
                    countItemsCart: 0,
                };
            }
        case CLEAR_CART:
            return {
                ...state,
                order: [],
                totalPrice: 0,
                countItemsCart: 0,
                inputReset: true,
            };
        case INPUT_RESET:
            return {
                ...state,
                inputReset: false,
            };

        default:
            return state;
    }
};
