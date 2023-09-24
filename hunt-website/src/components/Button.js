import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Button.css'

function Button({ children, size, back_color, onClick, redirect, color}) {
    size = size || 10;
    back_color = back_color || "#FFFFFF"
    color = color || "#000000"
    onClick = onClick || (() => {});

    const navigate = useNavigate();
    if (redirect) {
        if (redirect.includes("http")) {
            onClick = () => {
                window.open(redirect, "_blank");
            }
        }else {
            onClick = () => {
                navigate(redirect);
            }
        }
    }

    return (
        <div className="button">
            <button id="button"
                style={{
                    paddingLeft: size + 10, paddingRight: size + 10, paddingTop: size - 5, paddingBottom: size - 5,
                    backgroundColor: back_color, 
                    fontSize: size, 
                    color: color}}
                onClick={() => {onClick()}}
                >
                {children}
            </button>
        </div>
    )
}

export default Button