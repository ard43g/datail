import React from 'react';
import styles from './footer.module.css';
const Footer = ({totalPrice, countItemsCart, sendOrder, disabled}) => {
	return (
		<div className={styles.footer}>
			Товаров в корзине : {countItemsCart} на сумму : {totalPrice}
			<button disabled ={disabled} onClick={sendOrder} > В корзину</button>
		</div>
	)
}

export default Footer;
