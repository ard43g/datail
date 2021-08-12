import React from 'react';
import styles from './navbar.module.css';
import { useHistory } from 'react-router';



const Navbar = React.memo(({items, activeCategory, setActiveCategory}) =>  {

	const history = useHistory()

	const changeCategory = (item) => {
		setActiveCategory(item.id)
		history.push(item.url)
	}

	return (
		<nav>
			<ul style={styles}>
				{
					items.map((item, ind) => (
						<li className={activeCategory === item.id? styles.active : ''}onClick={() => changeCategory(item)} key={ind}>{item.name}</li>
						))
					}
			</ul>
		</nav>
	)
}, (prev, next) => {
	return prev.activeCategory === next.activeCategory
})

export default Navbar;
