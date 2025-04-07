import React from "react";

export const Alert_ = ({ color, title, description }) => {
    return (
        <div className={`alert alert-${color}`} role="alert">
        <h4 className="alert-heading">{title}</h4>
        <p style={{fontWeight:"100px", fontSize:"15px", opacity:"0.9"}}>{description}</p>
        </div>
    );
};