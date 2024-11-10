import React, { useState } from 'react';
import "./SkillRequestForm.css";

import webDevelopmentImage from "../assets/home-page-image-1.png";

function SkillRequestForm() {
    // Mapping of categories to their respective skills/titles
    const categoryToTitles = {
        'Technology': ['Software Development', 'UI/UX Design', 'Data Science', 'Cybersecurity', 'DevOps'],
        'Business': ['Marketing Strategy', 'Business Consulting', 'Financial Planning', 'Project Management'],
        'Legal': ['Legal Consulting', 'Contract Law', 'Intellectual Property'],
        'Creative': ['Graphic Design', 'Video Editing', 'Content Writing', 'Photography'],
        'Health & Wellness': ['Personal Training', 'Nutritionist', 'Haircut', 'Mental Health Counseling'],
        'Education': ['Tutoring', 'Curriculum Development', 'Education Consulting']
    };

    const locations = ['Online', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'];

    const [formData, setFormData] = useState({
        category: '',
        title: '',
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
            [name]: value,
            // Reset the title if the category changes
            ...(name === 'category' && { title: '' })
        });
    };

    return (
        <div className="form-page">
            <h1 className="page-title">Request a <span className="orange-text">Skill<span className="dot">.</span></span></h1>
            <form className="skill-request-form">
                <div className="form-container">
                    {/* Category */}
                    <label>
                        Skill Category
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {Object.keys(categoryToTitles).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Title */}
                    <label>
                        Skill Title
                        <select name="title" value={formData.title} onChange={handleChange} required disabled={!formData.category}>
                            <option value="">Select a skill</option>
                            {/* Only show titles based on the selected category */}
                            {formData.category && categoryToTitles[formData.category].map((title) => (
                                <option key={title} value={title}>
                                    {title}
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
