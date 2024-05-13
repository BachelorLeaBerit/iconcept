import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './styles/custom.css';
import { AuthProvider } from './context/AuthContext';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <AuthProvider>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
      </AuthProvider>
    );
  }
}
