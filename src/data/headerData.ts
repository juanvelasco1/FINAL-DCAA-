import logo from '../asset/logo-and-icesi.png';
import notification from '../asset/notifications.png';
import photo from '../asset/Andres-Salazar.png';
interface DataShape {
	logo: string;
	notification: string;
	photo: string;
	type: string;
}

export const headerData: DataShape[] = [
	{
		logo: logo,
		notification: notification,
		photo: photo,
		type: 'noti',
	},
];
