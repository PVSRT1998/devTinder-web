import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data?.data || []));
        } catch (err) {
            console.log("ERROR: " + err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <h1>No connections found.</h1>


    return (
        <div className='my-10 mx-10'>
            <h1 className='text-bold text-2xl text-center'>Connections</h1>
            {connections.map((connection) => {
                return (
                    <div key={connection._id} className="card card-side bg-base-300 shadow-sm my-3" style={{height: "110px"}}>
                        <figure>
                            <img
                                src={connection.photoUrl}
                                alt="Photo" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
                            <p>{connection.about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections
