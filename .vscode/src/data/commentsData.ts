import photo1 from '../asset/Lina Rengifo.png';
import photo2 from '../asset/Sebastian Quintero.png';
interface DataShape {
	comment: {
		photo: string;
		name: string;
		texts: string;
		id: number;
	};
}

export const commentsData: DataShape[] = [
	{
		comment: {
			id: 1,
			photo: photo1,
			name: 'Lina Rengifo',
			texts: 'Great, what a great event!',
		},
	},
	{
		comment: {
			id: 2,
			photo: photo2,
			name: 'Sebastian Quintero',
			texts: 'Ill be there!',
		},
	},
];
