import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">404</h2>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="text-blue-500">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
