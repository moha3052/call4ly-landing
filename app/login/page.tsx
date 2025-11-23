"use client"

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        if (!formData.email.trim()) {
            newErrors.email = "Email er påkrævet";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Indtast en gyldig email";
        }

        if (!formData.password) {
            newErrors.password = "Password er påkrævet";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGoogleLogin = async () => {
        // Log redirect URI før login
        console.log("Redirect URI:", `${window.location.origin}/dashboard`);

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (error) {
                console.error("Google login error:", error);
                setErrors(prev => ({ ...prev, email: "Kunne ikke logge ind med Google. Prøv igen." }));
            }
        } catch (error) {
            console.error("Google login error:", error);
            setErrors(prev => ({ ...prev, email: "Der opstod en fejl. Prøv igen." }));
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setErrors({ email: "Forkert email eller password" });
                setLoading(false);
                return;
            }

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
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
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                Log ind
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Velkommen tilbage til din AI-receptionist
                            </p>
                        </div>

                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="w-full bg-white border-2 cursor-pointer border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-gray-300 focus:outline-none flex items-center justify-center gap-3 mb-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Fortsæt med Google
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">eller log ind med email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
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
                                    Password
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
                                    placeholder="Dit password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? "Logger ind..." : "Log ind"}
                            </button>

                            {/* Signup Link */}
                            <p className="text-center text-gray-600 text-sm mt-6">
                                Har du ikke en konto?{" "}
                                <Link
                                    href="/signup"
                                    className="text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                                >
                                    Opret konto
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden rounded-3xl m-2">
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
                            Log ind for at fortsætte med din AI-receptionist
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="space-y-6 w-full max-w-xl mx-auto"
                        >
                            {[
                                { title: "Håndter alle opkald", desc: "AI'en svarer 24/7 på dine vegne", delay: 0 },
                                { title: "Se opkaldshistorik", desc: "Hold styr på alle samtaler", delay: 0.1 },
                                { title: "Analyser performance", desc: "Optimer din kundeservice", delay: 0.2 }
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
                            className="mt-8"
                        >
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}