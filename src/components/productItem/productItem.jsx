import React from 'react';
import ItemCounter from '../itemCounter/itemCounter';

 const ProductItem = ({items, onAddOrder, inputReset }) => {

	return (
		<>
			{
			items && items.map((item) => (
			<tr key={item.gid}>
				<td>{item.gid}</td>   
				<td>{item.gname}</td>
				<td>{item.gprice}</td>
				<ItemCounter price={item.gprice} id={item.gid} onAddOrder={onAddOrder} inputReset={inputReset} />
			</tr> 
			))
			}
		</>
	)

			
	
}


export default ProductItem;

