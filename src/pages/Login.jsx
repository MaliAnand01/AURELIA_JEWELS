import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    const response = login(data.email, data.password);
    
    if (response.success) {
        toast.success("Login successful");
        const from = location.state?.from || "/account";
        // If we have a product in state (from Buy Now), we might want to handle it.
        // But for now, just going back to the product pge is enough, user can click Buy Now again.
        // OR if from is Checkout, we go there.
        navigate(from);
    } else {
        toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#c9a36b]/40 p-10 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-8 text-center tracking-widest">
          Welcome Back
        </h2>

        <input {...register("email")} type="email" placeholder="Email" className="w-full mb-4" />

        <input {...register("password")} type="password" placeholder="Password" className="w-full mb-6" />

        <button className="w-full border border-[#c9a36b] py-3 tracking-widest hover:bg-[#c9a36b] hover:text-black transition">
          LOGIN
        </button>

        <p className="text-center text-sm mt-6 text-gray-400">
          Not registered?{" "}
          <Link to="/signup" className="text-[#c9a36b]">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
