"use client";

import Link from "next/link";

export default function HomePage(){
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-8 pt-32 pb-20 text-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full animate-fade-in">
                        <span className="text-blue-600 text-sm font-medium">🚀 AI-Powered Voice Agent</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
                        Never Miss a Call.
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Never Lose a Customer.
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100">
                        Call4ly is your AI-powered receptionist that handles customer calls, books appointments,
                        and answers questions 24/7 — so you can focus on growing your business.
                    </p>

                    <div className="flex justify-center items-center mb-16 animate-slide-up delay-200">
                        <Link
                            href="/waitlist"
                            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                        >
                            Join Waitlist
                            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
                        Why Businesses Choose Call4ly
                    </h2>
                    <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto animate-fade-in delay-100">
                        Powerful features designed to help your business thrive
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-100 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">📞</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Always Available</h3>
                            <p className="text-gray-600">
                                Never miss a customer call again. Our AI agent answers 24/7, even when you can't.
                            </p>
                        </div>

                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-cyan-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-200 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Booking</h3>
                            <p className="text-gray-600">
                                Automatically schedule appointments and sync with your calendar in real-time.
                            </p>
                        </div>

                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-purple-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-300 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Conversations</h3>
                            <p className="text-gray-600">
                                Powered by advanced AI, Call4ly speaks naturally and understands your customers.
                            </p>
                        </div>

                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-100 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Setup</h3>
                            <p className="text-gray-600">
                                Get started in minutes. Simply connect your phone number and customize your agent.
                            </p>
                        </div>

                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-orange-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-200 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">💼</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Voice</h3>
                            <p className="text-gray-600">
                                A polished, professional voice that represents your brand perfectly, every time.
                            </p>
                        </div>

                        <div className="group bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-pink-500 hover:shadow-xl transition-all duration-150 animate-slide-up delay-300 cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-150">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cost Effective</h3>
                            <p className="text-gray-600">
                                Get a full-time receptionist for a fraction of the cost of hiring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-2 border-gray-200 rounded-3xl p-10 md:p-12 shadow-xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                            Get started in 4 simple steps
                        </p>

                        <div className="space-y-6">
                            <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up for Early Access</h3>
                                    <p className="text-gray-600">Join the waitlist and be among the first to experience Call4ly.</p>
                                </div>
                            </div>

                            <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customize Your AI Agent</h3>
                                    <p className="text-gray-600">Set up business hours, services, and personalize responses to match your brand.</p>
                                </div>
                            </div>

                            <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Your Phone Number</h3>
                                    <p className="text-gray-600">Link your existing business number or get a new one from us.</p>
                                </div>
                            </div>

                            <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Let AI Handle the Rest</h3>
                                    <p className="text-gray-600">Your AI receptionist answers calls, books appointments, and keeps you informed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                Call4ly
                            </h3>
                            <p className="text-gray-600 text-sm">
                                © 2025 Call4ly. All rights reserved.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#x" className="text-gray-400 hover:text-blue-600 transition" aria-label="X (Twitter)">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#linkedin" className="text-gray-400 hover:text-blue-600 transition" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
