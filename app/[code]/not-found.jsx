"use client"

import { IoMdArrowBack } from "react-icons/io";

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* 404 Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <span className="text-4xl">🔗</span>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

          {/* Error Message */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Link Deleted
          </h2>
          <p className="text-gray-600 mb-8">
            This link has been deleted and is no longer available.
          </p>

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <IoMdArrowBack />
          </button>
        </div>

        {/* Additional Help Text */}
        <p className="text-gray-500 text-sm mt-6">
          If you believe this is an error, please contact support
        </p>
      </div>
    </div>
  );
}