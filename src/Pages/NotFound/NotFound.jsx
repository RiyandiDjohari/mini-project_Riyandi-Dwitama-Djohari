import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NotFound.css";

function NotFound() {
  return (
    <div className="page-not-found py-2">
      <div className='bg-light shadow'>
        <h2>4<i className="bi bi-bug"></i>4</h2>
        <h3 className='mt-4'>Opps! Page Not Found</h3>
        <p className='mt-4'>Sorry, an error has occured, Requested page not found</p>
        <div className='mt-5 btnWrapper'>
          <NavLink to="/">
            <button type='button' className='btn mx-2 btn-primary'><i className="bi bi-house-door-fill"></i> Back Home</button>
          </NavLink>
          <button type='button' className='btn mx-2 btn-success'><i className="bi bi-person-lines-fill"></i> Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound