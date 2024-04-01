import photo from '../asset/Andres-Salazar.png';
interface DataShape {
	photo: string;
	name: string;
	texts: string;
}

export const notificationData: DataShape[] = [
	{
		photo: photo,
		name: 'Lina Rengifo',
		texts: 'Start follow you',
	},

	{
		photo: photo,
		name: 'Sebastián Quintero',
		texts: 'Liked your post',
	},
];
