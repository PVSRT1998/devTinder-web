import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestsSlice';

const Request = () => {
    const userRequests = useSelector((store) => store.userRequests);
    const dispatch = useDispatch();

    const sendRequestStatus = async (status, requestId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true });
            dispatch(removeRe)
        } catch (err) {
            console.log("ERROR: " + err.message);
        }
    }

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            console.log(res);
            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log("ERROR: " + err.message);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!userRequests) return;
    if (userRequests.length === 0) return <h1 className='text-bold text-2xl text-center'>No Request Found!!!!</h1>

    return (
        <div className='my-10 mx-10'>
            <h1 className='text-bold text-2xl text-center'>Requests</h1>
            {userRequests.map((requests) => {

                const { _id, firstName, lastName, age, about, gender, photoUrl } = requests.fromUserId;
                return (
                    <div key={_id} className="card card-side bg-base-300 shadow-sm my-3" >
                        <figure style={{ maxHeight: "124px" }}>
                            <img
                                src={photoUrl}
                                alt="Photo" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{firstName + " " + lastName}</h2>
                            <p>{age + " " + gender}</p>
                            <p>{about}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => sendRequestStatus("rejected", requests._id)}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => sendRequestStatus("accepted", requests._id)}>Accept</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Request
