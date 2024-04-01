import photo from '../asset/Andres-Salazar.png';
import exit from '../asset/x.png';
import image from '../asset/Image.png';
import tag from '../asset/Tag.png';
import list from '../asset/List.png';
import emoji from '../asset/Fat Emoji.png';

interface DataShape {
	exits: { exit: string; type: string };
	photo: string;
	texts: string;
	image: string;
	tag: string;
	list: string;
	emoji: string;
}

export const createData: DataShape[] = [
	{
		exits: { exit: exit, type: 'create' },
		photo: photo,
		texts: 'What is happening?',
		image: image,
		tag: tag,
		list: list,
		emoji: emoji,
	},
];
