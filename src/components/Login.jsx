import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState('venkatateja@gmail.com');
  const [password, setPassword] = useState('Venkata@123');
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

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
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
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
