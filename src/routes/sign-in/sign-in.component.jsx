import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Setting up Google Auth with Firebase
const SignIn = () => {
	// A callback function for initializing Google's pop-up when the button is clicked
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		// I need to store the document ref created for
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google</button>
		</div>
	);
};

export default SignIn;
