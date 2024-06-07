// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, DocumentData, updateDoc, deleteDoc} from 'firebase/firestore';
import{getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { Profile } from '../types/profile';
import { postsTypes } from '../types/post';
import { createTypes } from '../types/create';
import { sectionsTypes } from '../types/sections';
import { headerTypes } from '../types/header';
import { notificationsTypes } from '../types/notifications';
import {personalUser, usersTypes} from '../types/users';
import { tagsTypes } from '../types/tags';
import {appState, dispatch} from "../store";
import create from "../components/navBar/sections/create/create";
import {setUserCredentials} from "../store/actions";

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

// Log and sign Users
export const createUser = (credentialsForm: any) =>{
	createUserWithEmailAndPassword(auth, credentialsForm.email, credentialsForm.password)
		.then(async (credentials) =>{
			const user = credentials.user;

			await updateProfile(user, {
				displayName: credentialsForm.name,
				photoURL: "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"
			})

			try{
				const where = doc(db, 'users', user.uid)
				const data: personalUser = {
					name: credentialsForm.name,
					email: credentialsForm.email,
					photo: "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"
				}
				appState.user = {
					name: data.name,
					email: data.email,
					photo: data.photo,

				};
				await setDoc(where, data);
				const savedPostRef = collection(where, "saveposts")
				const postDocRef = doc(savedPostRef, "new")
				await setDoc(postDocRef, {name: "new"})
				alert('Se creó el usuario ' + JSON.stringify(appState.user));
			} catch (err){
				console.error(err);
			}
		})
		.catch((err) =>{
			const errorCode = err.code;
			const errorMessage = err.message;
			console.error(errorMessage)
			alert(errorMessage)
		})

}

export const logIn = (credentialsForm: any) =>{
	signInWithEmailAndPassword(auth, credentialsForm.email, credentialsForm.password)
		.then(async (credentials) =>{
			const user = credentials.user;

			const userDocRef  = doc(db, "users", user.uid);
			getDoc(userDocRef)
				.then(doc => {
					if(doc.exists()){
						const userData = doc.data();

						dispatch(setUserCredentials({
							name: userData?.name || "No name",
							email: userData?.email || "No email",
							photo: userData?.photo || "No photo"
						}), true)

						console.log('login ' + JSON.stringify(appState.user));
					}
				})

			alert("Login successfull");
		})
		.catch((err) =>{
			const errorCode = err.code;
			const errorMessage = err.message;
			console.error(errorMessage)
			alert(errorMessage)
		})

}

export const signOutUser = () => {
	signOut(getAuth())
		.then(() => {
			console.log('Sesión cerrada con exito')
		})
		.catch((error) =>{
			console.error(error);
		})
}

//Funciones para agregar y obtener productos
export const addUsers = async (formData: Omit<usersTypes, 'users'>) => {
	try {
		const docRef = await addDoc(collection(db, 'users'), formData);

		return docRef.id;
	} catch (error) {
		throw new Error('Error al agregar usuario');
	}
};
export const addUser = async (formData: Profile) => {
	try {
		const docRef = await addDoc(collection(db, 'users'), formData);
		return docRef.id;
	} catch (error) {
		throw new Error('Error al agregar usuario');
	}
};

export async function uploadPost(postInfo: { user: string, postBody: string, image: File | null, imgProfile: string}) {
	let imageUrl = '';

	if(postInfo.image){
		const storage = getStorage();
		const storageRef = ref(storage, postInfo.image.name)

		try{
			const snapshot = await uploadBytes(storageRef, postInfo.image);
			imageUrl = await getDownloadURL(snapshot.ref);
			console.log(imageUrl)
		} catch (e){
			console.error('Error uploading image: ', e)
		}
	}
	try {
		console.log(JSON.stringify(auth))
		const docRef = await addDoc(collection(db, 'posts'), {
			comments: {

			},
			description: postInfo.postBody,
			image: imageUrl,

			user: {
				imgProfile: appState.user.photo,
				name: appState.user.name,

			},

		});
		console.log('Document written with ID: ', docRef.id);
		await updateDoc(docRef, {id: docRef.id})
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export async function updateProfileInfo(displayName: string, photo: File | null){
	let photoURL = appState.user.photo
	if(photo){
		const storage = getStorage();
		const storageRef = ref(storage, photo.name)

		try{
			const snapshot = await uploadBytes(storageRef, photo);
			photoURL = await getDownloadURL(snapshot.ref);
		} catch (e){
			console.error('Error uploading image: ', e)
		}
	}
	const user = auth.currentUser;
	if(user){
		try{
			await updateProfile(user, {
				displayName,
				photoURL,
			});

			const userDocRef = doc(db, "users", user.uid);
			await updateDoc(userDocRef,{
				name: displayName,
				photo: photoURL
			});

			const updateUser = {
				name: displayName,
				photo: photoURL,
				email: appState.user.email
			};

			dispatch(setUserCredentials(updateUser), true);
			alert("Profile updated successfull");
		} catch (err){
			console.error('Error updating profile: ', err);
		}
	} else{
		console.error('No user is signed in')
	}
}

export const getPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const arrayPost: Array<postsTypes | DocumentData> = [];

	querySnapshot.forEach((post) => {
		arrayPost.push(post.data());
	});
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

export const savePost = async (postId: string, postData: any)=> {
	const auth = getAuth();
	const db = getFirestore();

	console.log("Si esta " + postId)

	try {
		if(auth.currentUser) {
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const savedPostsCollectionRef = collection(userDocRef, "savedposts");

			const postDocRef = doc(savedPostsCollectionRef, postId);
			await setDoc(postDocRef, postData);

			console.log("Post saved");
		}

	} catch (error) {
		console.error("Error saving:", error);
	}


}

export const unsavePost = async (postId: string) => {
	const auth = getAuth();
	const db = getFirestore();

	if (auth.currentUser) {
		try {
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const savedPostsCollectionRef = collection(userDocRef, "savedposts")
			const postDocRef = doc(savedPostsCollectionRef, postId);
			await deleteDoc(postDocRef);

			console.log("Post deleted");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	} else {
		console.error("Usuario no autenticado");
	}
};

export const getSavedPosts = async () => {
	const auth = getAuth();
	const db = getFirestore();

	// Verificar si el usuario está autenticado
	if (auth.currentUser) {
		try {
			// Referencia al documento del usuario
			const userDocRef = doc(db, "users", auth.currentUser.uid);

			// Referencia a la subcolección savedposts dentro del documento del usuario
			const savedPostsCollectionRef = collection(userDocRef, "savedposts");

			// Obtener los documentos de la subcolección
			const savedPostsSnapshot = await getDocs(savedPostsCollectionRef);

			// Crear un array para almacenar los datos de los posts
			const savedPosts: {id: string}[] = [];
			savedPostsSnapshot.forEach((doc) => {
				savedPosts.push({ id: doc.id, ...doc.data() });
			});


			return savedPosts;

		} catch (error) {
			console.error("Error al obtener los posts guardados:", error);
		}
	} else {
		console.error("Usuario no autenticado");
	}
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

export const getAppState = () => {
	return appState;
}

