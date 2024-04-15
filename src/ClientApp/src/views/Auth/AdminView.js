// AdminPanelView.js
import React from 'react';
import Admin from './Admin';

const AdminView = () => {
    return (
        <div className="container">
            <h1>Admin</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Admin />
                </div>
            </div>
        </div>
    );
};

export default AdminView;
