import React, { useState, useEffect } from 'react';
import { getAllContactUsInformation, deleteContactUsDetail } from '../../../api/contactUsApi';
import Swal from 'sweetalert2';
import './ManageContactUsQueries.css';

function ManageContactUsQueries() {
    const [details, setDetails] = useState([]);

    const handelContactUsDetails = async () => {
        const result = await getAllContactUsInformation();
        if (result && result.details) {
            setDetails(result.details);
        }
    };

    const handelDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "The message will be deleted after 20 seconds.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, mark as read'
        });

        if (confirmResult.isConfirmed) {
            Swal.fire({
                title: 'Message marked as read!',
                text: 'The message will be deleted after 20 seconds.',
                icon: 'info',
                showCloseButton: true
            });


            setDetails((stateDetails) =>
                stateDetails.map((detail) =>
                    detail.id === id ?
                        { ...detail, rowColor: '#7ae582', isDisabled: true, buttonText: 'Marking as Read...' } 
                        : detail
                )
            );


            setTimeout(() => {
                setDetails((stateDetails) =>
                    stateDetails.map((detail) =>
                        detail.id === id ? 
                { ...detail, rowColor: '#ec5766', buttonText: 'Deleting...' } 
                : detail)
                );
            }, 10000);


            setTimeout(async () => {
                const result = await deleteContactUsDetail(id);
                if (result) {
                    setDetails((stateDetails) => stateDetails.filter((detail) => detail.id !== id));
                }
            }, 20000);
        }
    };

    useEffect(() => {
        window.scrollTo(0,0)
        handelContactUsDetails();
    }, []);

    return (
        <div className="manageContactUsQueriesContainer">
            <h1 className="manageContactTitle">Manage Contact Us</h1>

            <h2 className="contactUsDetailsTitle">Contact Us Details</h2>

            <div className="tableContainer">
                <table className="contactUsTable">
                    <thead>
                        <tr className="tableHeader">
                            <th className="headerCell">ID</th>
                            <th className="headerCell">Name</th>
                            <th className="headerCell">Email</th>
                            <th className="headerCell">Message</th>
                            <th className="headerCell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.length > 0 ? (
                            details.map((detail) => (
                                <tr
                                    key={detail.id}
                                    className="tableRow"
                                    style={{ backgroundColor: detail.rowColor || 'white' }}
                                >
                                    <td className="userNameCell">{detail.id}</td>
                                    <td className="userNameCell">{detail.userName}</td>
                                    <td className="userEmailCell">{detail.userEmail}</td>
                                    <td className="messageCell">{detail.message}</td>
                                    <td className="actionsCell">
                                        <button
                                            className="markReadButton"
                                            onClick={() => handelDelete(detail.id)}
                                            disabled={detail.isDisabled}
                                            style={{
                                                backgroundColor: detail.rowColor === '#7ae582' ? 'green' : detail.rowColor === '#ec5766' ? 'red' : undefined,
                                                color: 'white'
                                            }}
                                        >
                                            {detail.buttonText || 'Mark As Read'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="tableRow">
                                <td className="noUsersCell" colSpan="5">No messages found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageContactUsQueries;
