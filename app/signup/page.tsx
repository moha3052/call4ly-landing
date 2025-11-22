"use client"

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient"
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        companyName: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Fulde navn er påkrævet";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email er påkrævet";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Indtast en gyldig email";
        }

        if (!formData.password) {
            newErrors.password = "Password er påkrævet";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password skal være mindst 8 tegn";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Virksomhedsnavn er påkrævet";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Telefonnummer er påkrævet";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGoogleSignup = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (error) {
                console.error("Google signup error:", error);
                setErrors({ email: "Kunne ikke oprette konto med Google. Prøv igen." });
            }
        } catch (error) {
            console.error("Google signup error:", error);
            setErrors({ email: "Der opstod en fejl. Prøv igen." });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        fullName: formData.fullName,
                        phoneNumber: formData.phoneNumber,
                        companyName: formData.companyName,
                    }
                }
            });

            if (authError) {
                setErrors({ email: authError.message });
                setLoading(false);
                return;
            }

            const userId = authData.user?.id;
            if (!userId) {
                setLoading(false);
                return;
            }

            // Create company record
            const { error: companyError } = await supabase
                .from("companies")
                .insert([
                    {
                        name: formData.companyName,
                        owner_user_id: userId,
                        phone_number: formData.phoneNumber,
                    },
                ]);

            if (companyError) {
                console.error("Company creation error:", companyError);
                setErrors({ companyName: "Kunne ikke oprette virksomhed. Prøv igen." });
                setLoading(false);
                return;
            }

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Signup error:", error);
            setErrors({ email: "Der opstod en fejl. Prøv igen." });
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="flex min-h-screen">
                {/* Left Side - Form */}
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 relative">
                    {/* Logo in top left corner */}
                    <div className="absolute top-8 left-8">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
                                Call4ly
                            </h2>
                        </Link>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                    </div>

                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                Opret din konto
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Kom i gang med din AI-receptionist i dag
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Fulde navn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                    errors.fullName ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="Indtast dit fulde navn"
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                    errors.email ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="din@email.dk"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                    errors.password ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="Mindst 8 tegn"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Virksomhedsnavn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                    errors.companyName ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="Din virksomheds navn"
                            />
                            {errors.companyName && (
                                <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="mb-6">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                Telefonnummer <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                    errors.phoneNumber ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="+45 12 34 56 78"
                            />
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? "Opretter konto..." : "Opret konto"}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            Har du allerede en konto?{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                            >
                                Log ind
                            </Link>
                        </p>
                    </form>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:flex flex-1  bg-blue-600 relative overflow-hidden  rounded-3xl m-2">

                    {/* Animated decorative elements */}
                    <div className="absolute inset-0">
                        <motion.div
                            className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-white w-full">
                        <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-6xl font-bold mb-6 text-center"
                            >
                                Velkommen til Call4ly
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="text-2xl mb-12 text-white/90 text-center max-w-2xl"
                            >
                                Din AI-receptionist venter på at tage dine opkald 24/7
                            </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="space-y-6 w-full max-w-xl mx-auto"
                        >
                            {[
                                { title: "Opsætning på 5 minutter", desc: "Kom i gang med det samme", delay: 0 },
                                { title: "Dansk AI-stemme", desc: "Naturlig og professionel kommunikation", delay: 0.1 },
                                { title: "Ingen binding", desc: "Betal kun for det du bruger", delay: 0.2 }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 1.1 + feature.delay,
                                        duration: 0.5
                                    }}
                                    whileHover={{
                                        x: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex items-center gap-5 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: 1.2 + feature.delay,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-2xl mb-2">{feature.title}</h3>
                                        <p className="text-base text-white/80">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Testimonial / Stat */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="mt-8 "
                        >

                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}