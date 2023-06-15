"use client";

import NavBar from "@/components/NavBar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";


export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Full name: ", fullname);
        console.log("Email: ", email);
        console.log("Message: ", message);
    
        const res = await fetch("/api/auth/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            }),
        });
    
        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);
    
        if (success) {
            setFullname("");
            setEmail("");
            setMessage("");
        }
    };
    

    return (
        <>
            <NavBar />
            <div className="container mx-auto mt-40">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="bg-white border border-indigo-600 rounded-lg shadow-md p-2 border-4">
                            <h1 className="text-2xl font-bold mb-5 text-center">Contact Us</h1>

                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Full Name:
                                    </label>
                                    <input
                                        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-indigo-600 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e) => setFullname(e.target.value)}
                                        value={fullname}
                                        type="text"
                                        id="fullname"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-indigo-600 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="text"
                                        id="email"
                                        placeholder="john@gmail.com"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-black  text-sm font-bold mb-2"
                                        htmlFor="message"
                                    >
                                        Message:
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message}
                                        id="message"
                                        placeholder="Type your message here..."
                                    ></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"

                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg p-2">
                            <h1 className="text-2xl font-bold mb-5 text-left">Location</h1>
                            <img className="w-half" src="/download.jpg" alt="Location Image" />
                            <div className="flex items-center justify-center mt-2">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 12 16"
                                    className="text-xs font-semibold text-indigo-600"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
                                    ></path>
                                </svg>
                                <p className="font-semibold text-left mx-1">Location</p>
                                <p className="text-sm text-gray-800 mx-1">Rawalipindi</p>
                            </div>
                            <div className="flex items-center justify-center mt-1">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    className="text-xs font-semibold text-indigo-600"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                                </svg>
                                <p className="font-semibold text-base mx-1">Email</p>
                                <p className="text-sm text-gray-800 mx-1">prasad@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}