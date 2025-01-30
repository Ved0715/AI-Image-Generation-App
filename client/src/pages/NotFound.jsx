import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;