import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from '../UserContext';


function Signup() {
  const { setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        
      };
  
      const response = await fetch("http://localhost:3000/user/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure credentials (like cookies) are sent
        body: JSON.stringify(userInfo),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setUser(responseData.user);
        toast.success("Signed up Successfully");
  
        // Store session token or identifier instead of _id
        localStorage.setItem("sessionToken", responseData.user._id); // Example: Use a session token instead
  
        // Redirect or perform any other action upon successful signup
        // Example: history.push('/dashboard');
      } else {
        toast.error(responseData.message || "Failed to sign up.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to sign up. Please try again later.");
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                {/* <span>Name</span> */}
                <br />
                <input
                  type="text"
                  placeholder="Fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                {/* <span>Email</span> */}
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                {/* <span>Password</span> */}
                <br />
                <input
                  type="text"
                  placeholder="Password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-yellow-500 text-white rounded-md px-3 py-1 hover:bg-orange-700 duration-200">
                  Signup
                </button>
                <p className="text-xl">
                Have account?{" "}
                <Link to="/login" className="underline text-blue-500 cursor-pointer">
                  Login
                </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
