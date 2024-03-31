import home from '../asset/Home_active.png';
import saved from '../asset/Saved_disabled.png';
import create from '../asset/Create_disabled.png';
interface DataShape {
	image: string;
}

export const sectionData: DataShape[] = [
	{
		image: home,
	},

	{
		image: saved,
	},

	{
		image: create,
	},
];
