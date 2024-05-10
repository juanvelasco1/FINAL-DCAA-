// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';
import { Profile } from '../types/profile';
import { postsTypes } from '../types/post';
import { createTypes } from '../types/create';
import { sectionsTypes } from '../types/sections';
import { headerTypes } from '../types/header';
import { notificationsTypes } from '../types/notifications';
import { usersTypes } from '../types/users';
import { tagsTypes } from '../types/tags';

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
export const addUsers = async (formData: Omit<usersTypes, 'users'>) => {
	try {
		const docRef = await addDoc(collection(db, 'products'), formData);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};
export const addUser = async (formData: Profile) => {
	try {
		const docRef = await addDoc(collection(db, 'users'), formData);
		console.log('Usuario agregado con ID: ', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error al agregar usuario: ', error);
		throw new Error('Error al agregar usuario');
	}
};

export const getPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const arrayPost: Array<postsTypes | DocumentData> = [];

	querySnapshot.forEach((post) => {
		arrayPost.push(post.data());
	});
	console.log('Post de la Firebase');
	console.log(querySnapshot);
	console.log(arrayPost);
	return arrayPost;
};

export const getCreate = async () => {
	const querySnapshot = await getDocs(collection(db, 'create'));
	const arrayCreate: Array<createTypes | DocumentData> = [];

	querySnapshot.forEach((create) => {
		arrayCreate.push(create);
	});

	return arrayCreate;
};

export const getProfile = async () => {
	const querySnapshot = await getDocs(collection(db, 'profile'));
	const arrayProfile: Array<Profile | DocumentData> = [];

	querySnapshot.forEach((profile) => {
		arrayProfile.push(profile);
	});
	console.log('Post de profile');

	return arrayProfile;
};

export const getSections = async () => {
	const querySnapshot = await getDocs(collection(db, 'sections'));
	const arraySections: Array<sectionsTypes | DocumentData> = [];

	querySnapshot.forEach((sections) => {
		arraySections.push(sections);
	});

	return arraySections;
};

export const getHeader = async () => {
	const querySnapshot = await getDocs(collection(db, 'header'));
	const arrayHeader: Array<headerTypes | DocumentData> = [];

	querySnapshot.forEach((header) => {
		arrayHeader.push(header);
	});

	return arrayHeader;
};

export const getNotifications = async () => {
	const querySnapshot = await getDocs(collection(db, 'notifications'));
	const arrayNotifications: Array<notificationsTypes | DocumentData> = [];

	querySnapshot.forEach((notifications) => {
		arrayNotifications.push(notifications);
	});

	return arrayNotifications;
};

export const getUsers = async () => {
	const querySnapshot = await getDocs(collection(db, 'users'));
	const arrayUsers: Array<usersTypes | DocumentData> = [];

	querySnapshot.forEach((user) => {
		arrayUsers.push(user);
	});

	return arrayUsers;
};

export const getTTags = async () => {
	const querySnapshot = await getDocs(collection(db, 'tags'));
	const arrayTags: Array<tagsTypes | DocumentData> = [];

	querySnapshot.forEach((tag) => {
		arrayTags.push(tag);
	});

	return arrayTags;
};
// export const getSaved = async () => {
// 	const querySnapshot = await getDocs(collection(db, 'saved'));
// 	const arraySaved: Array<Saved| DocumentData> = [];

// 	querySnapshot.forEach((saved) => {
// 		arraySaved.push(saved);
// 	});

// 	return arraySaved;
// };

// export const addDataToCollection = async (data: any) => {
// 	try {
// 		 const docRef = await addDoc(collection(db, 'users'), data);
//     console.log(docRef)
// 		console.log('Document written with ID:', docRef.id);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
