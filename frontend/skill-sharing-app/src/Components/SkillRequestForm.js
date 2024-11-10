import React, { useState } from 'react';
import "./SkillRequestForm.css";

function SkillRequestForm() {
    // Common list of skills for both "Skill to Request" and "Skill to Offer"
    const skills = [
        'Software Development', 'UI/UX Design', 'Data Science', 'Cybersecurity', 'DevOps',
        'Marketing Strategy', 'Business Consulting', 'Financial Planning', 'Project Management',
        'Legal Consulting', 'Contract Law', 'Intellectual Property',
        'Graphic Design', 'Video Editing', 'Content Writing', 'Photography',
        'Personal Training', 'Nutritionist', 'Haircut', 'Mental Health Counseling',
        'Tutoring', 'Curriculum Development', 'Education Consulting'
    ];

    const locations = ['Online', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'];

    const [formData, setFormData] = useState({
        skillToRequest: '',
        skillToOffer: '',
        description: '',
        dueDate: '',
        location: '',
        comments: ''
    });

    // Handler for form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="form-page">
            <h1 className="page-title">Request a <span className="orange-text">Skill<span className="dot">.</span></span></h1>
            <form className="skill-request-form">
                <div className="form-container">
                    {/* Skill to Request */}
                    <label>
                        Skill to Request
                        <select name="skillToRequest" value={formData.skillToRequest} onChange={handleChange} required>
                            <option value="">Select a skill</option>
                            {skills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Skill to Offer */}
                    <label>
                        Skill to Offer
                        <select name="skillToOffer" value={formData.skillToOffer} onChange={handleChange} required>
                            <option value="">Select a skill</option>
                            {skills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Description */}
                    <label>
                        Description of Project
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describe the project requirements"
                        />
                    </label>

                    {/* Due Date */}
                    <label>
                        Due Date of Project
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {/* Location */}
                    <label>
                        Location
                        <select name="location" value={formData.location} onChange={handleChange} required>
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Additional Comments */}
                    <label>
                        Additional Comments (Optional)
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Add any additional information..."
                        />
                    </label>
                </div>

                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
}

export default SkillRequestForm;
