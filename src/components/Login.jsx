import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Handle login logic here
      const res = await axios.post(BASE_URL + '/login', { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
  }

  const handleSignUp = async () => {
    try {
      const signUpPayload = {
        firstName, lastName, emailId, password
      }
      const res = await axios.post(BASE_URL + "/signup", signUpPayload, { withCredentials: true });
      dispatch(addUser(res.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log("ERROR: " + err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            {!isLoginView &&
              <div>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="firstName">FirstName</label>
                  <input type="text" id="firstName" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="lastName">LastName</label>
                  <input type="text" id="lastName" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </fieldset>
              </div>}
            <fieldset className="fieldset">
              <label className="label" htmlFor="email">Email ID</label>
              <input type="email" id="email" className="input" placeholder="Email ID" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="password">Password</label>
              <input type="password" id="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={isLoginView ? handleLogin : handleSignUp}>{isLoginView ? "Login" : "SignUp"}</button>
          </div>
          <div className="card-actions justify-center">
            {!isLoginView && <p>Already have an account? <span className='text-bolder link' onClick={() => setIsLoginView(true)}>Login here!</span></p>}
            {isLoginView && <p>Don't have an account yet? <span className='text-bolder link' onClick={() => setIsLoginView(false)}>Sign Up</span></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
