import React from 'react';

const RegisterForm = ({ formData, errors, message, handleChange, handleSubmit }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-50 mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Registrer ny bruker</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Fornavn</label>
            <input
              type="text"
              className={`form-control ${errors.firstName && 'is-invalid'}`}
              id="firstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Etternavn</label>
            <input
              type="text"
              className={`form-control ${errors.lastName && 'is-invalid'}`}
              id="lastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-post</label>
            <input
              type="text"
              className={`form-control ${errors.email && 'is-invalid'}`}
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Passord</label>
            <input
              type="password"
              className={`form-control ${errors.password && 'is-invalid'}`}
              id="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success">Registrer</button>
          </div>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
