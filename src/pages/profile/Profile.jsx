import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/appContext/AppContext';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { db, storage } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

function Profile() {
	const [progress, setProgress] = useState(0);
	const [updatePhoto, setUpdatePhoto] = useState(false);
	const { setActiveLink } = useContext(AppContext);
	const { name, email, height, sex, unit, dispatch, userRef, profilePhotoUrl } =
		useContext(WorkoutContext);
	const [edit, setEdit] = useState(false);

	const [formData, setFormData] = useState({
		name: name,
		email: email,
		height: height,
		sex: sex,
		unit: unit,
		feet: 0,
		inches: 0,
		centimeters: 0,
	});

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onUpdate = async () => {
		if (formData.unit === 'metric') {
			formData.height = +(formData.centimeters / 2.54).toFixed(0);
		} else {
			formData.height = +(+formData.feet * 12 + +formData.inches).toFixed(0);
		}

		try {
			const auth = getAuth();
			const docRef = doc(db, 'users', auth.currentUser.uid);
			await updateDoc(docRef, {
				name: formData.name,
				email: formData.email,
				sex: formData.sex,
				unit: formData.unit,
				height: formData.height,
			});

			dispatch({
				type: 'UPDATE_USER_PROFILE',
				payload: {
					unit: formData.unit,
					sex: formData.sex,
					name: formData.name,
					email: formData.email,
					height: formData.height,
				},
			});

			toast.success('Profile Updated!');
		} catch (error) {
			toast.error('Error saving changes...');
		}
	};

	const onClick = () => {
		if (edit) {
			onUpdate();
		}

		setEdit(!edit);
	};

	useEffect(() => {
		setActiveLink(window.location.pathname);

		formData.feet = +(height / 12).toFixed(0);
		formData.inches = +(height % 12);
		formData.centimeters = height * 2.54;

		// eslint-disable-next-line
	}, [formData.unit, profilePhotoUrl]);

	const onSubmitPhoto = e => {
		e.preventDefault();
		const file = e.target[0].files[0];
		uploadFile(file);
	};

	const uploadFile = file => {
		if (!file) return;

		const uuidForPhoto = uuidv4();

		const storageRef = ref(
			storage,
			`/users/${userRef}-${uuidForPhoto}-${file.name}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			snapshot => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
                
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(url => {
					const saveUrl = async () => {
						const auth = getAuth();
						const docRef = doc(db, 'users', auth.currentUser.uid);

						await updateDoc(docRef, {
							profilePhotoUrl: url,
						});

						dispatch({ type: 'CHANGE_PROFILE_PIC', payload: url });
                        setUpdatePhoto(false)
					};

					saveUrl();
					console.log(url);
				});
			}
		);
        
	};

	return (
		<div id="profile" className="page">
			<div className="container">
				<div className="userPhotoContainer">
					<div className="userPhoto">
						<img src={profilePhotoUrl} alt="" />
					</div>
					<p onClick={() => setUpdatePhoto(!updatePhoto)}>
						{updatePhoto ? 'Cancel' : 'Update Photo'}
					</p>
					<form
						className={`photoUploadForm ${updatePhoto && 'active'}`}
						onSubmit={onSubmitPhoto}
					>
						<input type="file" name="userProfilePic" id="userProfilePic" />
						<button>Submit</button>
						<p>Upload {progress} % complete</p>
					</form>
				</div>
				<form>
					<p className="editDetails" onClick={onClick}>
						{edit ? 'done' : 'change'}
					</p>
					<div className="inputGroup">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={onChange}
							disabled={!edit}
						/>
					</div>
					<div className="inputGroup">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={onChange}
							disabled={!edit}
						/>
					</div>
					{formData.unit === 'imperial' ? (
						<>
							<label className="heightLabel" htmlFor="height">
								Height:
							</label>
							<div className="heightInputs">
								<div className="inputGroup">
									<input
										type="number"
										name="feet"
										id="feet"
										value={formData.feet}
										onChange={onChange}
										disabled={!edit}
									/>
									<label htmlFor="feet">ft.</label>
								</div>
								<div className="inputGroup">
									<input
										type="number"
										name="inches"
										id="inches"
										value={formData.inches}
										onChange={onChange}
										disabled={!edit}
									/>
									<label htmlFor="inches">in.</label>
								</div>
							</div>
						</>
					) : (
						<>
							<label className="heightLabel" htmlFor="height">
								Height:
							</label>
							<div className="heightInputs">
								<div className="inputGroup">
									<input
										type="number"
										name="centimeters"
										id="centimeters"
										value={formData.centimeters}
										onChange={onChange}
										disabled={!edit}
									/>
									<label htmlFor="centimeters">cm.</label>
								</div>
							</div>
						</>
					)}
					<div className="radioDiv">
						<p>Sex:</p>
						<div className="radios">
							<div className="radioGroup">
								<label htmlFor="male">Male</label>
								<input
									type="radio"
									name="sex"
									id="male"
									value="male"
									onChange={onChange}
									checked={formData.sex === 'male'}
									disabled={!edit}
								/>
							</div>
							<div className="radioGroup">
								<label htmlFor="female">Female</label>
								<input
									type="radio"
									name="sex"
									id="female"
									value="female"
									onChange={onChange}
									checked={formData.sex === 'female'}
									disabled={!edit}
								/>
							</div>
						</div>
					</div>
					<div className="radioDiv">
						<p>Measurement System:</p>
						<div className="radios">
							<div className="radioGroup">
								<label htmlFor="imperial">Imperial (US)</label>
								<input
									type="radio"
									name="unit"
									id="imperial"
									value="imperial"
									onChange={onChange}
									checked={formData.unit === 'imperial'}
									disabled={!edit}
								/>
							</div>
							<div className="radioGroup">
								<label htmlFor="metric">Metric (UK)</label>
								<input
									type="radio"
									name="unit"
									id="metric"
									value="metric"
									onChange={onChange}
									checked={formData.unit === 'metric'}
									disabled={!edit}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;
