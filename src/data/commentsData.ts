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
			photo: './Images/Andrés-Salazar.png',
			name: 'Lina Rengifo',
			texts: 'Great, what a great event!',
		},
	},
	{
		comment: {
			id: 2,
			photo: './Images/Andrés-Salazar.png',
			name: 'Sebastian Quintero',
			texts: 'Ill be there!',
		},
	},
];
