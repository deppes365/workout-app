import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

export const fetchWorkouts = async () => {
	try {
		const { currentUser } = getAuth();

		const docRef = doc(db, 'users', currentUser.uid);
		const docSnap = await getDoc(docRef);
		

		if (docSnap.exists()) {
			const userWorkouts = docSnap.data().workouts;
            return userWorkouts
		}
	} catch (error) {}
};
