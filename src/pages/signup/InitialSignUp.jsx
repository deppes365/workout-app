import React from 'react';

function InitialSignUp({
	onChange,
	name,
	email,
	password,
	password2,
	handleNextPage,
    passwordsMatch
}) {
	return (
		<form onSubmit={handleNextPage}>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				required
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				value={email}
				onChange={onChange}
			/>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				required
				value={password}
				onChange={onChange}
			/>
			<input
				type="password"
				name="password2"
				id="password2"
				placeholder="Confirm Password"
				required
				value={password2}
				onChange={onChange}
			/>
            {!passwordsMatch && (<p className='password-error'>Password does not match</p>)}
			<div className="btnDiv">
				<button type="submit">Next</button>
			</div>
		</form>
	);
}

export default InitialSignUp;
