import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export type LoginInput = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>();
  
  // Add animation styles
  const animationStyles = `
    /* Particle animation */
    @keyframes float-up {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    .particle {
      animation: float-up linear infinite;
    }
    
    /* Wave animations */
    @keyframes wave {
      0% {
        transform: translateX(0) translateZ(0) scaleY(1);
      }
      50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.8);
      }
      100% {
        transform: translateX(-50%) translateZ(0) scaleY(1);
      }
    }
    
    .wave1 {
      animation: wave 15s infinite linear;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.25,141.14c67.6,0,123.11-25.76,158.36-48.4,56.39-36.37,121.17-53.3,190.28-62.3C604.83,21.77,668.19,6.33,753.11,11.33,812,14.53,860.33,27.17,909.94,46.35c41.21,15.93,80.74,33.2,118.94,50.84C1052.4,113.76,1081.41,128.16,1128,128.2c44.55,0,91.03-6.8,131-29.31,50.98-28.56,78.84-86.33,135.54-86.87,42.05-.4,81.82,22.07,120.46,39.41V120Z' fill='white'/%3E%3C/svg%3E%0A");
      background-size: 100% 100%;
      background-position: bottom;
      z-index: 1;
    }
    .wave2 {
      animation: wave 12s infinite reverse linear;
      animation-delay: -5s;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.25,141.14c67.6,0,123.11-25.76,158.36-48.4,56.39-36.37,121.17-53.3,190.28-62.3C604.83,21.77,668.19,6.33,753.11,11.33,812,14.53,860.33,27.17,909.94,46.35c41.21,15.93,80.74,33.2,118.94,50.84C1052.4,113.76,1081.41,128.16,1128,128.2c44.55,0,91.03-6.8,131-29.31,50.98-28.56,78.84-86.33,135.54-86.87,42.05-.4,81.82,22.07,120.46,39.41V120Z' fill='white'/%3E%3C/svg%3E%0A");
      background-size: 100% 100%;
      background-position: bottom;
      z-index: 2;
    }
    .wave3 {
      animation: wave 10s infinite linear;
      animation-delay: -2s;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.25,141.14c67.6,0,123.11-25.76,158.36-48.4,56.39-36.37,121.17-53.3,190.28-62.3C604.83,21.77,668.19,6.33,753.11,11.33,812,14.53,860.33,27.17,909.94,46.35c41.21,15.93,80.74,33.2,118.94,50.84C1052.4,113.76,1081.41,128.16,1128,128.2c44.55,0,91.03-6.8,131-29.31,50.98-28.56,78.84-86.33,135.54-86.87,42.05-.4,81.82,22.07,120.46,39.41V120Z' fill='white'/%3E%3C/svg%3E%0A");
      background-size: 100% 100%;
      background-position: bottom;
      z-index: 3;
    }
    
    /* Rotating shapes */
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes rotate-reverse {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    
    .rotate-shape {
      animation: rotate 30s linear infinite;
    }
    
    .rotate-shape-reverse {
      animation: rotate-reverse 25s linear infinite;
    }
    
    /* Light beam */
    @keyframes beam {
      0% {
        opacity: 0.1;
        transform: translateX(-20px);
      }
      50% {
        opacity: 0.3;
        transform: translateX(0);
      }
      100% {
        opacity: 0.1;
        transform: translateX(20px);
      }
    }
    
    .light-beam {
      animation: beam 8s ease-in-out infinite;
    }
    
    .light-beam-delayed {
      animation: beam 8s ease-in-out infinite;
      animation-delay: 4s;
    }
    
    /* Card glow animation */
    @keyframes gradient-xy {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    .animate-gradient-xy {
      background-size: 400% 400%;
      animation: gradient-xy 15s ease infinite;
    }
  `;
  
  // Append animation styles to document head
  React.useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = animationStyles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await axios.post<{ access_token: string }>(
        "/api/auth/login",
        {
          email: data.email,
          password: data.password
        }
      );

      if (res.data) {
        login(res.data.access_token);
        navigate("/");
      } else {
        alert("Username or password is wrong");
      }
    } catch (err) {
      alert("Username or password is wrong");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 px-4 relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, index) => (
          <div 
            key={index}
            className="particle absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`, 
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <div className="wave1 absolute bottom-0 left-0 right-0 h-24 bg-white opacity-10"></div>
        <div className="wave2 absolute bottom-0 left-0 right-0 h-24 bg-white opacity-10"></div>
        <div className="wave3 absolute bottom-0 left-0 right-0 h-24 bg-white opacity-10"></div>
      </div>
      
      {/* Animated geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-pink-500 opacity-30 rotate-shape"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border-4 border-yellow-300 opacity-30 rotate-shape-reverse"></div>
      <div className="absolute top-3/4 left-1/3 w-24 h-24 border-4 border-green-400 opacity-30 rotate-shape"></div>
      <div className="absolute top-1/3 right-1/3 w-36 h-36 border-4 border-blue-400 opacity-30 rotate-shape-reverse"></div>
      
      {/* Light beams */}
      <div className="absolute top-0 left-1/4 w-2 h-screen bg-gradient-to-b from-cyan-500 to-transparent opacity-20 light-beam"></div>
      <div className="absolute top-0 right-1/3 w-2 h-screen bg-gradient-to-b from-purple-500 to-transparent opacity-20 light-beam-delayed"></div>
      <div className="absolute top-0 left-2/3 w-2 h-screen bg-gradient-to-b from-pink-500 to-transparent opacity-20 light-beam"></div>
      
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden z-10">
        {/* Card glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
        
        {/* Loading overlay */}
        {isPending && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 relative">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-400 border-b-purple-500 border-l-pink-500 border-r-indigo-500 rounded-full animate-spin"></div>
              <div className="w-10 h-10 border-4 border-t-transparent border-blue-400 border-b-purple-500 border-l-pink-500 border-r-indigo-500 rounded-full animate-spin absolute top-3 left-3"></div>
            </div>
          </div>
        )}
        
        {/* Header section */}
        <div className="relative z-10 mb-8">
          <h2 className="text-4xl font-bold text-center text-white">
            Welcome Back
          </h2>
          <p className="text-center text-indigo-200 mt-2">
            Please sign in to your account
          </p>
        </div>

        <form
          className="space-y-6 relative z-10"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-indigo-100 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                className="block w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white transition duration-200 placeholder:text-indigo-200/70"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-pink-400 text-xs" id="emailError">
                  Email is required.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-indigo-100"
              >
                Password
              </label>
              <a href="#" className="text-xs text-indigo-300 hover:text-white">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                className="block w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white transition duration-200 placeholder:text-indigo-200/70"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-pink-400 text-xs" id="passwordError">
                  Password is required.
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative z-10 mt-8 flex items-center justify-center">
          <span className="h-px bg-indigo-300/30 w-full"></span>
          <span className="px-4 text-indigo-200 text-sm">or</span>
          <span className="h-px bg-indigo-300/30 w-full"></span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 relative z-10">
          <button className="flex items-center justify-center py-2.5 border border-indigo-300/30 rounded-lg bg-white/5 hover:bg-white/10 transition duration-200 text-white group">
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center py-2.5 border border-indigo-300/30 rounded-lg bg-white/5 hover:bg-white/10 transition duration-200 text-white group">
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-indigo-200 relative z-10">
          Don't have an account?{" "}
          <a
            onClick={() => {
              navigate("/register");
            }}
            className="text-indigo-300 hover:text-white font-medium cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;