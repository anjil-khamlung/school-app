import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-bold tracking-tight text-black">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-2 max-w-md text-gray-500">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Back Home */}
        <NavLink
          to="/"
          className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Back to Home 
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
