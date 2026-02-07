import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const response = signup(data.name, data.email, data.password);
    
    if (response.success) {
        navigate("/account");
    } else {
        alert(response.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#c9a36b]/40 p-10 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-8 text-center tracking-widest">
          Create Account
        </h2>

        <input {...register("name")} placeholder="Full Name" className="w-full mb-4" />

        <input {...register("email")} type="email" placeholder="Email" className="w-full mb-4" />

        <input {...register("phone")} placeholder="Phone Number" className="w-full mb-4" />

        <input {...register("password")} type="password" placeholder="Password" className="w-full mb-6" />

        <button className="w-full border border-[#c9a36b] py-3 tracking-widest hover:bg-[#c9a36b] hover:text-black transition">
          SIGN UP
        </button>

        <p className="text-center text-sm mt-6 text-gray-400">
          Already registered?{" "}
          <Link to="/login" className="text-[#c9a36b]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
