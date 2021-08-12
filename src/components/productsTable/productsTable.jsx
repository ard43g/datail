import React from 'react';
import ProductItem from '../productItem/productItem';

const ProductsTable = React.memo(({products, onAddOrder, inputReset}) => {

	return (
		<section >
			{
				products.map((i, index) => (
					<table key={index}>
						<caption><h1>{i.rname}</h1></caption>

						<thead>
						<tr>
							<th>id</th>
							<th>Название</th>
							<th>Цена</th>
							<th>Количество</th>
							<th>Сумма</th>
						</tr>
						</thead>
						<tbody>
							{
								<ProductItem items={i.goods} key={index} onAddOrder={onAddOrder} inputReset={inputReset}/> 
							}
						</tbody>

					</table>
				))
			}
		</section>
	)
}, (prev, next) => {
	return !next.inputReset === !prev.inputReset && prev.products === next.products
})

export default ProductsTable;
