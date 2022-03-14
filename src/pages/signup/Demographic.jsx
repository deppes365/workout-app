import React from 'react';

function Demographic({
	onChange,
	unit,
	sex,
	feet,
	inches,
	centimeters,
	weight,
    createUserProfile
}) {
	return (
		<form id="demographic" onSubmit={createUserProfile}>
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
						checked={unit === 'imperial'}
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
						checked={unit === 'metric'}
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
						checked={sex === 'male'}
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
						checked={sex === 'female'}
					/>
				</div>
			</div>
			<div className="height-div">
				<p className="height-title">Height</p>
				{unit === 'imperial' ? (
					<div className="height-group">
						<div className="height-input">
							<input
								type="number"
								name="feet"
								id="feet"
								onChange={onChange}
								value={feet}
								min="0"
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
								min="0"
								required
							/>
							<label htmlFor="feet">cm</label>
						</div>
					</div>
				)}
			</div>
			<div className="weight-div">
				<p className="weight-title">Weight</p>
				<div className="weight-input">
					<input
						type="number"
						name="weight"
						id="weight"
						required
						min="0"
						value={weight}
						onChange={onChange}
					/>
					<label htmlFor="">{unit === 'imperial' ? 'lbs' : 'kg'}</label>
				</div>
			</div>
			<div className="btnDiv">
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}

export default Demographic;
