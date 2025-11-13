'use client'

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function Home() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !phone) return;

        const { error } = await supabase
            .from("signups")
            .insert([{ email, phone }]);

        if (error) {
            console.error("Error inserting signup:", error);
        } else {
            setSubmitted(true);
            setEmail("");
            setPhone("");
        }
    };

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-900 overflow-hidden">

            {/* Hero content - Card */}
            <div className="z-10 px-6 py-12 max-w-2xl bg-white rounded-2xl shadow-lg">
                <p className="text-xs uppercase text-gray-500 tracking-widest mb-3">
                    Realtime Speech-to-Whiteboard
                </p>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-4">
                    Visualise Your Ideas, <span className="text-blue-700">Instantly</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                    Transform spoken concepts into collaborative diagrams with the power of AI. Draw system architectures, workflows, and ideas through natural conversation.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your business email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-700 text-white hover:bg-blue-800 font-bold px-6 py-3 rounded-lg transition"
                        >
                            Get Started
                        </button>
                    </form>
                ) : (
                    <p className="text-green-600 mt-6 font-semibold">
                        ✅ Thanks for signing up! We'll contact you soon.
                    </p>
                )}
            </div>
        </main>
    );
}
