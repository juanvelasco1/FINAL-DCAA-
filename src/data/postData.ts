import img1 from '../asset/Andres-Salazar.png';
import image1 from '../asset/datathon.png';

import img2 from '../asset/Sebastian Quintero.png';
import image2 from '../asset/pokemon.png';

import img3 from '../asset/Lina Rengifo.png';
import image3 from '../asset/gira-icesi.png';

import image4 from '../asset/medicina.png';

interface DataShape {
	user: {
		name: string;
		imgProfile: string;
	};
	image: string;
	description: string;
	tag: string;

	comment: {
		photo: string;
		name: string;
		texts: string;
		id: number;
	};
}

export const postData: DataShape[] = [
	{
		user: {
			name: 'Andrés Salazar',
			imgProfile: img1,
		},
		image: image1,
		description:
			'On March 1, 2 and 8, Datathon will be held again, a learning day in data analytics that will be held at the Icesi University in alliance with Structum and SAP.',
		tag: 'Events',

		comment: {
			id: 1,
			photo: img3,
			name: 'Lina Rengifo',
			texts: 'Great, what a great event!',
		},
	},
	{
		user: {
			name: 'Sebastian Quintero',
			imgProfile: img2,
		},
		image: image2,
		description: 'Thanks to my career I am already part of the Pokemon team',
		tag: 'Project',
		comment: {
			id: 1,
			photo: img3,
			name: 'Lina Rengifo',
			texts: 'Congrats!',
		},
	},

	{
		user: {
			name: 'Lina Rengifo',
			imgProfile: img3,
		},
		image: image3,
		description: 'You are welcome to participate in this wonderful event.',
		tag: 'Events',
		comment: {
			id: 2,
			photo: img2,
			name: 'Sebastian Quintero',
			texts: 'Ill be there!',
		},
	},
	{
		user: {
			name: 'Andrés Salazar',
			imgProfile: img1,
		},
		image: image4,
		description: 'Today my masters students stood out at the great event for health professionals',
		tag: 'Project',
		comment: {
			id: 1,
			photo: img3,
			name: 'Lina Rengifo',
			texts: 'Congrats!',
		},
	},
];
