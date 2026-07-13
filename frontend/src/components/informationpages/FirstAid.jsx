import { useState } from "react";
import "./InfoPages.css";
import { Link } from 'react-router-dom'

export default function FirstAid() {
    return (
        <div className="FirstAid-container">
            <div className="FirstAid-card">
                <h1>First Aid Tips</h1>
                <h3>Having a knowledge of basic first aid skills could save someone's life or your own life. 
                    These skills are easy to learn and recall in emergency situations. 
                    Basic skills like CPR, setting a splint, stopping bleeding in dire situations, 
                    are important life skills.
                </h3>
                <h2>Table of Contents</h2>
                <ul>
                    <li>What's in a First Aid kit?</li>
                    <li>CPR and When to Do It</li>
                    <li>How to help someone who's chocking</li>
                    <li>How to help someone experiencing a seizure</li>
                </ul>
            </div>
        </div>
    )
}