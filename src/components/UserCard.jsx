import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + `/request/send/${status}/${userId}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
    return (
        <div className="card card-border bg-base-300 w-96 shadow-sm">

            <div className="card-body">
                <figure>
                    <img
                        src={photoUrl}
                        alt="photo" />
                </figure>
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-error" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-success" onClick={()=> handleSendRequest("interested", _id)}>Send Request</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
