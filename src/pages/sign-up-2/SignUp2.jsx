import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore'
import {db} from '../../firebase.config'
import app from '../../firebase.config';
import './sign-up-2.scss';
import { useNavigate } from 'react-router-dom';

function SignUp2() {
	const [formData, setFormData] = useState({
		unit: 'imperial',
		sex: '',
		feet: 0,
		inches: 0,
		centimeters: 0,
        weight: 0
	});

	const { unit, sex, feet, inches, centimeters, weight } = formData;

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

    const auth = getAuth(app)

    const navigate = useNavigate()

    const saveData = async () => {
        try {
            const docRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(docRef, {
                ...formDataCopy
            })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
        
    }

	const formDataCopy = formData;

	const onSubmit = e => {
		e.preventDefault();
		if (unit === 'imperial') {
			formDataCopy.height = +feet * 12 + +inches;
            formDataCopy.weight = weight
		} else {
			formDataCopy.height = (+centimeters / 2.54).toFixed(1);
            formDataCopy.weight = (weight * 2.2).toFixed(1);
		}
        delete formDataCopy.centimeters
        delete formDataCopy.feet
        delete formDataCopy.inches
        
        saveData()
	};

	return (
		<div id="sign-up-2">
			<h1>
				Eppes
				<span>
					<em>Fit</em>
				</span>
			</h1>
			<p>Let's finish your account!</p>
			<form onSubmit={onSubmit}>
				<div className="radio-div">
					<div className="radio-group">
						<label htmlFor="imperial">Imperial(US)</label>
						<input
							className="radio"
							type="radio"
							name="unit"
							id="imperial"
							value="imperial"
							onChange={onChange}
							required
						/>
					</div>
					<div className="radio-group">
						<label htmlFor="metric">Metric(UK)</label>
						<input
							className="radio"
							type="radio"
							name="unit"
							id="metric"
							value="metric"
							onChange={onChange}
							required
						/>
					</div>
				</div>
				<div className="radio-div">
					<div className="radio-group">
						<label htmlFor="male">Male</label>
						<input
							className="radio"
							type="radio"
							name="sex"
							id="male"
							value="male"
							onChange={onChange}
							required
						/>
					</div>
					<div className="radio-group">
						<label htmlFor="female">Female</label>
						<input
							className="radio"
							type="radio"
							name="sex"
							id="female"
							value="female"
							onChange={onChange}
							required
						/>
					</div>
				</div>
				<div className="height-div">
					<p className='height-title'>Height</p>
					{unit === 'imperial' ? (
                        <div className="height-group">
                            <div className="height-input">
                                <input
                                    type="number"
                                    name="feet"
                                    id="feet"
                                    onChange={onChange}
                                    value={feet}
                                    min='0'
                                    required
                                />
                                <label htmlFor="feet">ft</label>
                            </div>
                            <div className="height-input">
                                <input
                                    type="number"
                                    name="inches"
                                    id="inches"
                                    min="0"
                                    max="11"
                                    onChange={onChange}
                                    value={inches}
                                    required
                                />
                                <label htmlFor="inches">in</label>
                            </div>
					</div>
				) : (
						<div className="height-group">
							<div className="height-input">
								<input
									type="number"
									name="centimeters"
									id="centimeters"
									onChange={onChange}
									value={centimeters}
                                    min='0'
									required
								/>
								<label htmlFor="feet">cm</label>
							</div>
						</div>
					)}
                </div>
                <div className="weight-div">
                    <p className='weight-title'>Weight</p>
                    <div className="weight-input">
                        <input type="number" name='weight' id='weight' required min='0' value={weight} onChange={onChange}/>
                        <label htmlFor="">{unit === 'imperial' ? 'lbs' : 'kg'}</label>
                    </div>
                </div>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default SignUp2;
