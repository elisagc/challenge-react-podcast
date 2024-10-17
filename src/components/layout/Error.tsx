import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <h1>Ha habido un error al realizar la petición </h1>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

export default Error;
