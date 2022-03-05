import React, {useState, useContext, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./signup.scss"
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import app from '../../firebase.config'
import AppContext from '../../context/AppContext'
import { db } from '../../firebase.config'
import { setDoc, doc } from 'firebase/firestore'




function SignUp() {
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData;
  const navigate = useNavigate()

  const {setMenuActive} = useContext(AppContext)

  useEffect(() => setMenuActive(false), [])


  const onChange = (e) => {
    setFormData(prevState => (
      {
        ...prevState,
        [e.target.id]: e.target.value
      }
    ))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if(password !== password2) {
        return setPasswordsMatch(false)
    }

    try {
        const auth = getAuth(app)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await updateProfile(auth.currentUser, {
            displayName: name
        })

        const formDataCopy = formData;
        formDataCopy.displayName = name
        delete formDataCopy.name
        delete formDataCopy.password
        delete formDataCopy.password2

        try {
          await setDoc(doc(db, 'users', user.uid), formDataCopy)

        } catch (error) {
          console.log(error);
        }

        

        
        navigate('/register-2')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div id='sign-up'>
      <h1>Eppes<span><em>Fit</em></span></h1>
      <p>Let's create your account!</p>
      <form onSubmit={onSubmit}>
      <input
					type="text"
					name="name"
					id="name"
					placeholder="Name"
					value={name}
					required
					onChange={onChange}
				/>
        <input type="text" name='email' id='email' placeholder='Email' required onChange={onChange} />
        <input type="password" name='password' id='password' placeholder='Password' required onChange={onChange}/>
        <input type="password" name='password2' id='password2' placeholder='Confirm Password' required onChange={onChange}/>
        {!passwordsMatch && (<p className='password-error'>Password does not match</p>)}
        <button>Sign Up</button>
      </form>
      
      <Link to='/sign-in'>Already have an account? Sign in here</Link>
    </div>
  )
}

export default SignUp