"use client"

import { useState } from "react";
import { supabase} from "@/app/lib/supabaseClient";
import Link from "next/link";

export default function WaitlistPage(){
    const [form, setForm] = useState({name: "", email: "", company: "",  phone: "",});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Insert into Supabase
        const { error } = await supabase.from("waitlist").insert([form]);
        if (error) {
            console.error("❌ Databasefejl:", error);
            alert("Der skete en fejl. Prøv igen senere.");
            setLoading(false);
            return;
        }

        // Send email via Resend
        const emailRes = await fetch("/api/sendWaitlistEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: form.name, email: form.email }),
        });

        const emailData = await emailRes.json();
        if (!emailData.success) {
            console.error("❌ Emailfejl:", emailData.error);
        }

        setSubmitted(true);
        setLoading(false);
    };


    if (submitted) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 p-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Du er på listen!
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                        Tak fordi du tilmeldte dig Call4ly's venteliste. Vi kontakter dig, så snart vi lancerer.
                    </p>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8 shadow-lg">
                        <h3 className="text-gray-900 font-semibold mb-3">Hvad sker der nu?</h3>
                        <ul className="text-gray-600 text-left space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Vi sender dig eksklusive opdateringer om vores lancering</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Tidlig adgang til Call4ly før offentlig lancering</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Særlig prissætning for tidlige brugere</span>
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="inline-block border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all hover:shadow-lg"
                    >
                        Tilbage til forside
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col p-8 pt-12">
            <div className="max-w-2xl mx-auto w-full">
                {/* Back Link */}
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all group">
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Tilbage til forside</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded-full">
                        <span className="text-blue-700 text-sm font-medium">Limited Early Access Spots</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Join the Waitlist
                    </h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Be among the first to experience the future of customer service.
                        Get early access to Call4ly's AI-powered receptionist.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg mx-auto space-y-5 bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-xl"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John "
                            value={form.name}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@company.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+45 55 12 34 56"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder="Acme Inc."
                            value={form.company}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Joining...
                            </span>
                        ) : (
                            <span>
                                Join the Waitlist
                                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        )}
                    </button>

                    <p className="text-gray-500 text-sm text-center">
                        By joining, you agree to receive updates about Call4ly.
                    </p>
                </form>
            </div>
        </main>
    );
}