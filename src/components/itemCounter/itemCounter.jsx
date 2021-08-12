import React, {useState, useEffect} from 'react';
import styles from './itemCounter.module.css';


const ItemCounter = ({price, id, onAddOrder,inputReset }) => {

	const [value, setValue] = useState("")
	const [reset, setReset] = useState(true)

	const changeValue = (e) => {
		setValue(e.replace(/\D/g, ''))
		
	}

	useEffect(() => {
		setReset(true)
		if (inputReset && reset) {
			setValue("")
			setReset(false)
		}
		
	}, [inputReset])

	const addInCart = (e) => {
		if(e >= 0 && e !== "") {

			const order = {
				id : +id,
				count: +e,
				price: +price
			}
			onAddOrder(order)
		}
	}

	return (
		<>
			<td><input className={styles} placeholder="Введите количество" value={value} onChange={(e) => changeValue(e.target.value) }  onBlur={e => addInCart(e.target.value)}/></td>
			<td>{value && value!=="0"? price * value : ""}</td> 
		</>
	)
}

export default ItemCounter;