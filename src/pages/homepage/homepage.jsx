import React from 'react';
import './homepage.scss';
import { HomepageContainer } from './homepage-styles';
import Directory from '../../components/directory/directory';

const Homepage = () => {
	return (
		<HomepageContainer>
			<Directory />
		</HomepageContainer>
	);
};

export default Homepage;