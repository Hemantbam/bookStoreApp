import React, { useEffect, useState } from 'react';
import './ManageSubscribers.css';
import { getSubscribersList } from '../../../api/subscribe';

function ManageSubscribers() {
    const [details, setDetails] = useState([]);

    const handelSubscriberList = async () => {
        const result = await getSubscribersList();
        console.log(result.data.list);
        setDetails(result.data.list);
    };

    useEffect(() => {
        window.scrollTo(0,0)
        handelSubscriberList();
    }, []);

    return (
        <>
            <div className="ManageSubscribersContainer">
                <h1 className='manageSubscriberTitle'>Manage Subscribers</h1>
                <div className="totalSubscribersCount">
                    <span>Total Subscribers: {details.length}</span>
                </div>
                <h2>Subscribers Details</h2>
                <div className="tableContainer">


                    <table>
                        <thead>
                            <tr className='tableHeader'>
                                <th className='headerCell'>ID</th>
                                <th className='headerCell'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.length > 0 ? (
                                details.map((detail) => (
                                    <tr className="tableRow" key={detail.id}>
                                        <td>{detail.id}</td>
                                        <td>{detail.userEmail}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='noSubscriberCell'>
                                    <td colSpan="2">No Subscribers Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ManageSubscribers;
