import React, { useEffect, useState } from 'react';
// import './Profile.css'; // Import CSS for styling

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await fetch('http://localhost:3100/users/user-info'); // Adjust this endpoint if necessary
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else if (response.status === 404) {
                    setError("User not found");
                } else {
                    setError("An error occurred while fetching the user info");
                }
            } catch (err) {
                console.error("Error fetching user info:", err);
                setError("An error occurred while fetching the user info");
            } finally {
                setLoading(false);
            }
        }

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1>Profile</h1>
                <div className="profile-info">
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Location:</strong> {userInfo.location}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Category:</strong> {userInfo.category.join(", ")}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
