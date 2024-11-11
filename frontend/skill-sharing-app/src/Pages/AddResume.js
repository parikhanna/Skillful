import React, { useState } from 'react';
import './AddResume.css';

function AddResume() {
    const [file, setFile] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '', show: false });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setNotification({ message: "Please select a file to upload.", type: 'error', show: true });
            return;
        }

        // Create FormData to send file data
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Make the API request to upload the file
            const response = await fetch('http://localhost:3100/users/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNotification({ message: "Resume uploaded successfully!", type: 'success', show: true });
            } else {
                setNotification({ message: "Failed to upload resume.", type: 'error', show: true });
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
            setNotification({ message: "There was an error uploading the resume.", type: 'error', show: true });
        }
    };

    const closeNotification = () => {
        setNotification({ ...notification, show: false });
    };

    return (
        <div className="add-resume">
            <h1>Upload Your Resume<span className="dot">.</span></h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <button type="submit">Upload Resume</button>
            </form>

            {/* Inline notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    <span>{notification.message}</span>
                    <button onClick={closeNotification}>&times;</button>
                </div>
            )}
        </div>
    );
}

export default AddResume;
