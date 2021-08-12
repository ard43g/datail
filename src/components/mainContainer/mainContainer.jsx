import React, { useEffect, useReducer } from 'react';
import styles from './mainContairer.module.css';
import ProductsTable from '../productsTable/productsTable';
import Navbar from "../navbar/navbar";
import Footer from '../footer/footer';
import { getItems, postOrder } from '../../Api';
import { initialState, reducer } from '../reducer/reducer';

import {FETCH_DATA, SET_CATEGORIES, SET_ACTIVE_CATEGORY, SET_FILTER_ITEMS, SET_TOTAL_PRICE, SET_COUNT_ITEMS_CART, SET_ORDER, CLEAR_CART, INPUT_RESET } from '../reducer/reducer'

const MainContainer = () => {

	const [state, dispatch] = useReducer(reducer, initialState)
	const {items, categories, activeCategory,filterItems, totalPrice,countItemsCart, order, inputReset} = state;

	useEffect(() => {
		getItems().then((r) => dispatch({type : FETCH_DATA, payload: r}))
	
    }, []);

    useEffect(() => {
        if (items) {
			dispatch({type: SET_CATEGORIES})
			dispatch({type: SET_ACTIVE_CATEGORY, payload: items[0].rid})
        }
    }, [items])

	useEffect(() => {
		if(items) {
			const filteredCategory = items.filter((i) => i.rid === activeCategory)
		dispatch({type: SET_FILTER_ITEMS, payload: filteredCategory})
		}
	}, [activeCategory])


	useEffect(() =>{
			dispatch({type: SET_TOTAL_PRICE})
			dispatch({type: SET_COUNT_ITEMS_CART})

	},[order])


	const addOrder = (obj) => {
		dispatch({type: SET_ORDER, payload: obj})

	}

	const clearCart = () => {
		dispatch({type: CLEAR_CART})
		setTimeout(() => {dispatch({type: INPUT_RESET})} ,0)
		

	}

	const setActiveCategory = (id) =>  {
		if(id !== activeCategory) {
			dispatch({type: SET_ACTIVE_CATEGORY, payload: id})
		}
	}

	const onSendOrder = () => {
		if (order && order.length > 0) {
			const formData = new FormData();
			order.forEach(i => {	
				formData.append(`product[${i.id}]`, i.count)
			})
			postOrder(formData);
			clearCart()
	
		}

	}

	return (
		<main className={styles.container}>

			{categories && <Navbar items={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}
			{ filterItems && <ProductsTable products={filterItems} onAddOrder={addOrder} inputReset={inputReset} />}
			<Footer totalPrice={totalPrice} countItemsCart={countItemsCart} sendOrder={onSendOrder} disabled={order.length < 1 }/>

		</main>
	)
}

export default MainContainer;
