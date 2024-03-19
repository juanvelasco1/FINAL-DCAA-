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
			photo: 'src="./Images/Andrés-Salazar.png "',
			name: 'Lina Rengifo',
			texts: 'Great, what a great event!',
		},
	},
	{
		comment: {
			id: 1,
			photo: 'src="./Images/Andrés-Salazar.png "',
			name: 'Lina Rengifo',
			texts: 'Ill be there!',
		},
	},
];
