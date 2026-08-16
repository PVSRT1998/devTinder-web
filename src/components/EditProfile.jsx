import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [showToaster, setShowToaster] = useState(false);

    const saveProfileHandler = async () => {
        try {
            const savePayload = { firstName, lastName, photoUrl, age, gender, about };
            const res = await axios.patch(BASE_URL + "/profile/edit", savePayload, { withCredentials: true });
            console.log(res);
            dispatch(addUser(res?.data?.data));
            setShowToaster(true);
            setTimeout(() => {
                setShowToaster(false);
            }, 3000);
        } catch (err) {
            console.log("ERROR: " + err)
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-300 w-96 mx-10">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="firstName">FirstName</label>
                            <input type="text" id="firstName" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="lastName">LastName</label>
                            <input type="text" id="lastName" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="photoUrl">Photo URL</label>
                            <input type="text" id="photoUrl" className="input" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="age">Age</label>
                            <input type="number" id="age" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="gender">Gender</label>
                            <select id="gender" defaultValue={gender} onChange={(e) => setGender(e.target.value)} className="select">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="about">About</label>
                            <textarea id='about' className="textarea" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} ></textarea>
                        </fieldset>

                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={saveProfileHandler}>Save Profile</button>
                    </div>
                </div>
            </div>
            <div>
                <UserCard user={{_id, firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {showToaster &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            }
        </div>

    )
}

export default EditProfile
