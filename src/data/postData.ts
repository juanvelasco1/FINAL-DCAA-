import img from '../asset/Andres-Salazar.png';
import image from '../asset/datathon.png';

interface DataShape {
	user: {
		name: string;
		imgProfile: string;
	};
	image: string;
	description: string;
	tag: string;
}

export const postData: DataShape[] = [
	{
		user: {
			name: 'Andrés Salazar',
			imgProfile: img,
		},
		image: image,
		description:
			'On March 1, 2 and 8, Datathon will be held again, a learning day in data analytics that will be held at the Icesi University in alliance with Structum and SAP.',
		tag: 'Events',
	},
];
