import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>();
  const handleRegister = async (data: RegisterInput) => {
    try {
      await axios.post("/api/auth/register", {
        email: data.email,
        username: data.username,
        password: data.password
      });
      alert("User successfully registered");
      navigate("/login");
    } catch (err) {
      alert("Username or email already registered");
    }
  };
  const { mutate } = useMutation({ mutationFn: handleRegister });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white border-opacity-20 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 block w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Enter your username"
              {...register("username")}
            />

            {errors.username && (
              <p className="text-red-600 text-xs mt-1" id="titleError">
                Username is required.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1" id="titleError">
                Email is required.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1" id="titleError">
                Password is required.
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium shadow-sm"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-xs text-center text-gray-600">
            By creating an account, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

// You'll need to add these custom animations to your global CSS
// @keyframes blob {
//   0% {
//     transform: translate(0px, 0px) scale(1);
//   }
//   33% {
//     transform: translate(30px, -50px) scale(1.1);
//   }
//   66% {
//     transform: translate(-20px, 20px) scale(0.9);
//   }
//   100% {
//     transform: translate(0px, 0px) scale(1);
//   }
// }
// .animate-blob {
//   animation: blob 7s infinite;
// }
// .animation-delay-2000 {
//   animation-delay: 2s;
// }
// .animation-delay-4000 {
//   animation-delay: 4s;
// }

export default Register;