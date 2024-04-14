import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterView = ({ formData, errors, message, handleChange, handleSubmit, redirectToLogin }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-50 mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Registrer ny bruker</h2>
        <RegisterForm
          formData={formData}
          errors={errors}
          message={message}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {redirectToLogin && <p className="mt-3">Redirecting to login...</p>}
      </div>
    </div>
  );
};

export default RegisterView;
