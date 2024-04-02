import photo2 from '../asset/Sebastian Quintero.png';
import photo3 from '../asset/Lina Rengifo.png';
interface DataShape {
	photo: string;
	name: string;
	texts: string;
}

export const notificationData: DataShape[] = [
	{
		photo: photo2,
		name: 'Sebastián Quintero',
		texts: 'Liked your post',
	},

	{
		photo: photo3,
		name: 'Lina Rengifo',
		texts: 'Start follow you',
	},
];
