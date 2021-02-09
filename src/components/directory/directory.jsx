import React, { Component } from 'react';
import MenuItem from '../menu-item/menu-item';
import './directory.scss';

class Directory extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			sections: [
				{
					title: 'hats',
					imageUrl: "/images/hats.png",
					id: 1,
					linkUrl: 'shop/hats'
				},
				{
					title: 'jackets',
					imageUrl: "/images/jackets.png",
					id: 2,
					linkUrl: 'shop/jackets'
				},
				{
					title: 'trainers',
					imageUrl: "/images/sneakers.png",
					id: 3,
					linkUrl: 'shop/trainers'
				},
				{
					title: 'womens',
					imageUrl: "/images/womens.png",
					size: 'large',
					id: 4,
					linkUrl: 'shop/womens'
				},
				{
					title: 'mens',
					imageUrl: "/images/men.png",
					size: 'large',
					id: 5,
					linkUrl: 'shop/mens'
				}
			]
		 }

	}


	render() { 
		return (  
			<div className='directory-menu'>
				{
					this.state.sections.map(({ id, ...otherSectionProps}) => (
						<MenuItem key={id} {...otherSectionProps} />
					))
				}
			</div>
		);
	}
}
 
export default Directory;