// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {Profile} from'../types/profile'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



// export const addDataToCollection = async (data: any) => {
// 	try {
// 		 const docRef = await addDoc(collection(db, 'users'), data);
//     console.log(docRef)
// 		console.log('Document written with ID:', docRef.id);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
