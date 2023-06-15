import NavBar from '@/components/NavBar';
import { update_profile } from '@/Services/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
    const Router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        newEmail: "", // New field for updating email
    });

    const [error, setError] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        newEmail: "", // New field for updating email
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            setError({ ...error, name: "Name field is required" });
            return;
        }

        if (!formData.password) {
            setError({ ...error, password: "Password field is required" });
            return;
        }

        if (!formData.confirmPassword) {
            setError({ ...error, confirmPassword: "Confirm Password field is required" });
            return;
        }

        if (!formData.newEmail) {
            setError({ ...error, newEmail: "New Email field is required" });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError({ ...error, confirmPassword: "Password and Confirm Password do not match" });
            return;
        }

        const res = await update_profile(formData);
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                Router.push('/auth/login');
            }, 1000);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <NavBar />
            <section className="bg-indigo-600 text-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Update Password and Email
                        </h2>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div className="text-left">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your name
                                </label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                                    placeholder="John Doe"
                                    required
                                />
                                {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                            </div>
                            <div className="text-left">
                                <label htmlFor="new-email" className="block mb-2 text-sm font-medium text-gray-900">
                                    New email
                                </label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                                    type="email"
                                    name="new-email"
                                    id="new-email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                                    placeholder="newname@company.com"
                                    required
                                />
                                {error.newEmail && <p className="text-sm text-red-500">{error.newEmail}</p>}
                            </div>
                            <div className="text-left">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    New Password
                                </label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                                    required
                                />
                                {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <input
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                    }
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                                    required
                                />
                                {error.confirmPassword && (
                                    <p className="text-sm text-red-500">{error.confirmPassword}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Reset password and update email
                            </button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}
