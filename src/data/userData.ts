interface DataShape {
	name: string;
	photo: string;
	mail: string;
	password: string;
}

export const userData: DataShape[] = [
	{
		name: 'Andres salazar',
		photo: 'src="./Images/Andrés-Salazar.png "',
		mail: 'andres.salazar.u.icesi.edu.co',
		password: '12345678',
	},
	{
		name: 'Lina Rengifo',
		photo: 'src="./Images/Andrés-Salazar.png "',
		mail: 'lina.regifo.u.icesi.edu.co',
		password: '12345678',
	},
	{
		name: 'Sebastián Quintero',
		photo: 'src="./Images/Andrés-Salazar.png "',
		mail: 'sebas.quintero.u.icesi.edu.co',
		password: '12345678',
	},
];
