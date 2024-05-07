import photo from '../asset/Andres-Salazar.png';
import iconMail from '../asset/mail.png';
import iconLinkedin from '../asset/linkedin.png';
import { addDataToCollection } from '../utils/firebase';
interface DataShape {
	name: string;
	photo: string;
	mail: string;
	iconMail: string;
	iconLinkedin: string;
	password: string;
}

export const userData: DataShape[] = [
	{
		name: 'Andres salazar',
		photo: photo,
		mail: 'andres.salazar.u.icesi.edu.co',
		password: '12345678',
		iconMail: iconMail,
		iconLinkedin: iconLinkedin,
	},
];

addDataToCollection(userData);
