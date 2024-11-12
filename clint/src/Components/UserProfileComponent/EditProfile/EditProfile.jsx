import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import { updateUserProfile, userDetailsById, updateUserProfileImageById } from '../../../api/userDetailsApi';
import decodeToken from '../../../jwtDecode/jwtDecode';
import Swal from 'sweetalert2';

function EditProfile() {
    const [profileImage, setProfileImage] = useState('./Images/profile.png');
    const [imagePreview, setImagePreview] = useState(profileImage);
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const tokenDetails = decodeToken();

    const serverURL = "http://localhost:8080";


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result || "./Images/profile.png");
            };
            reader.readAsDataURL(file);
            setProfileImage(file);
            try {
                await updateUserProfileImageById(tokenDetails.id, file);
                Swal.fire({
                    icon: 'success',
                    title: 'Image Updated',
                    text: 'Your profile image has been updated successfully.',
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Image Update Failed',
                    text: 'There was an error updating your profile image. Please try again later.',
                });
            }
        }
    };

    const handleGetUserDetails = async () => {
        const result = await userDetailsById(tokenDetails.id);
        if (result && result.details) {
            setUserDetails(result.details);
            if (result.details.userImage) {
                setProfileImage(result.details.userImage);
                setImagePreview(`${serverURL}/${result.details.userImage.replace(/\\/g, '/')}` );
            }
        }
    };


    const handleImageError = () => {
        setImagePreview('./Images/profile.png'); 
    };

    const handleUpdateUserData = async () => {
        try {
            const result = await updateUserProfile(tokenDetails.id, userDetails);
            if (result.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    text: 'Your profile has been updated successfully.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an issue updating your profile. Please try again.',
                });
            }
            setIsEditing(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an issue updating your profile. Please try again later.',
            });
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleUpdateUserData();
        } else {
            setIsEditing(true);
        }
    };

    useEffect(() => {
        handleGetUserDetails();
    }, []);

    return (
        <div className="editProfileContainer">
            <h1>Edit Profile</h1>
            <div className="profilePicture">
                <img src={imagePreview || './Images/profile.png'} alt="Profile"  onError={handleImageError}/>
                <label htmlFor="fileInput" className="updateImageBtn">Update Image</label>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>
            <div className="editProfileBox">
                <form className="editProfileForm">
                    <div className="formRow">
                        <label htmlFor="firstName">First Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="firstName"
                                value={userDetails.firstName || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                            />
                        ) : (
                            <span>{userDetails.firstName}</span>
                        )}
                    </div>

                    <div className="formRow">
                        <label htmlFor="lastName">Last Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="lastName"
                                value={userDetails.lastName || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                            />
                        ) : (
                            <span>{userDetails.lastName}</span>
                        )}
                    </div>

                    <div className="formRow">
                        <label htmlFor="address">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="address"
                                value={userDetails.address || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                            />
                        ) : (
                            <span>{userDetails.address}</span>
                        )}
                    </div>

                    <div className="formRow">
                        <label htmlFor="contact">Contact Number</label>
                        {isEditing ? (
                            <input
                                type="number"
                                id="contact"
                                value={userDetails.contactNumber || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
                            />
                        ) : (
                            <span>{userDetails.contactNumber}</span>
                        )}
                    </div>

                    <div className="formRow">
                        <label htmlFor="city">City</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="city"
                                value={userDetails.city || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                            />
                        ) : (
                            <span>{userDetails.city}</span>
                        )}
                    </div>

                    <div className="formRow">
                        <label htmlFor="about">Tell us something about you</label>
                        {isEditing ? (
                            <textarea
                                id="about"
                                value={userDetails.about || ''}
                                onChange={(e) => setUserDetails({ ...userDetails, about: e.target.value })}
                            />
                        ) : (
                            <p>{userDetails.about}</p>
                        )}
                    </div>

                    <button type="button" onClick={toggleEdit}>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
