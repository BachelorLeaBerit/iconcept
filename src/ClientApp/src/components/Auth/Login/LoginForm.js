import React from 'react';

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-post</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />           
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Passord</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-success align-center">Logg inn</button>
      </div>
    </form>
  );
};

export default LoginForm;
