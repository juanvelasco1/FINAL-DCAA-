// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { Profile } from '../types/profile';

const firebaseConfig = {
	apiKey: 'AIzaSyDkU8T7hNAzWtJVXl7AdGWZSxdpPh9eU6A',
	authDomain: 'dca-7d103.firebaseapp.com',
	projectId: 'dca-7d103',
	storageBucket: 'dca-7d103.appspot.com',
	messagingSenderId: '56439818923',
	appId: '1:56439818923:web:27778ebad5d9a2bad5c5ee',
	measurementId: 'G-Q92PG2S5V1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

//Funciones para agregar y obtener productos
export const addUsers = async (formData: Omit<Product, 'users'>) => {
	try {
		const docRef = await addDoc(collection(db, 'products'), formData);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const arrayProducts: Array<Product> = [];

	querySnapshot.forEach((doc) => {
		const data = doc.data() as any;
		arrayProducts.push({ id: doc.id, ...data });
	});

	return arrayProducts;
};

// export const addDataToCollection = async (data: any) => {
// 	try {
// 		 const docRef = await addDoc(collection(db, 'users'), data);
//     console.log(docRef)
// 		console.log('Document written with ID:', docRef.id);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };