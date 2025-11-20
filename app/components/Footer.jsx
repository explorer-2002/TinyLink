import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-gray-800 py-8 px-4 border-t border-gray-600">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-50">
          © {new Date().getFullYear()} TinyLink. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;