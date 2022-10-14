import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDoEsm3aWxHeYej4fPgC1GkxUiRAPz-Uko",
	authDomain: "crwn-clothing-db-53de0.firebaseapp.com",
	projectId: "crwn-clothing-db-53de0",
	storageBucket: "crwn-clothing-db-53de0.appspot.com",
	messagingSenderId: "252883793159",
	appId: "1:252883793159:web:46438c3927ba2221cf41a2",
};

// Initialize Firebase using the config file
const firebaseApp = initializeApp(firebaseConfig);

// Allows the user to sign in with their Google account
const provider = new GoogleAuthProvider(); //
provider.setCustomParameters({
	prompt: "select_account",
});

// Creates an instance of the authenticator provided by Firebase
export const auth = getAuth();
// Runs Firebase's signInWithPopup method when called
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Creates an instance of my firestore database
export const db = getFirestore();

// Receive a user authentication object, and store the data inside of firestore
export const createUserDocumentFromAuth = async (userAuth) => {
	// Check if there's an existing document reference
	const userDocRef = doc(db, "users", userAuth.uid); // (database, collection-name, identifier)
	console.log(userDocRef);

	// getDoc retrieves data from our document reference and stores it as a 'snapshot'
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	// exists() checks if the current instance exists within the database
	console.log(userSnapshot.exists());

	// We need to create and set the document IF it doesn't ALREADY exist within the database.
	// That's why the displayName and email values are pulled off of the userAuth object.
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		// setDoc takes in a Document reference and the data that will be set to it,
		// and sends it to the database
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (err) {
			console.log("error creating the user", err.message);
		}
	}

	return userDocRef;
};
