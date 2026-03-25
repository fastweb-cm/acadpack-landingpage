"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Zap, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  ArrowRight,
  PieChart,
  Bell,
  Lock,
  Download,
  School,
  Globe,
  Send,
  Loader2
} from 'lucide-react';
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import Image from 'next/image';

// Counter Component for the "Countdown" effect
const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out expo function for smooth finish
      const easeOutValue = 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(easeOutValue * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const data = {
      name: formData.get("name"),
      tel: formData.get("tel"),
      email: formData.get("email"),
      institution: formData.get("institution"),
      role: formData.get("role"),
      students: formData.get("students"),
    };

    try {
      setIsSubmitting(true);
      const res = await emailjs.send("service_5nzrdco","template_jxxxdig",{
        name: data.name,
        email: data.email,
        tel: data.tel,
        role: data.role,
        students: data.students,
        institution: data.institution
      },"GtxoUl6ZVKyypzzzJ");

      setShowSuccess(true);
      e.target.reset();
      
    } catch (error) {
      toast.error("An unexpected error occurred, try again later")
      setShowSuccess(false);
    } finally{
      setIsSubmitting(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#fafbff] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {showSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500">Our team will contact you within 24 hours to schedule your personalized demo.</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Side Brand Column (Desktop) */}
                <div className="hidden md:flex flex-col justify-between w-1/3 bg-indigo-600 p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                      <School className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Start Your Journey</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">Join 50+ elite institutions digitizing education across Cameroon.</p>
                  </div>
                  <div className="relative z-10 space-y-4">
                     <div className="flex items-center gap-2 text-xs font-medium text-indigo-200">
                        <CheckCircle2 className="w-4 h-4" /> 15-Min Briefing
                     </div>
                     <div className="flex items-center gap-2 text-xs font-medium text-indigo-200">
                        <CheckCircle2 className="w-4 h-4" /> Feature Deep-dive
                     </div>
                  </div>
                  {/* Decor */}
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                </div>

                <div className="flex-1 p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Request a Demo</h3>
                  <p className="text-slate-500 text-sm mb-4">{`Fill in the details below and we'll reach out shortly.`}</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase">Name <span className="text-red-600">*</span></label>
                        <input name="name" required type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase">Phone <span className="text-red-600">*</span></label>
                        <input name="tel" required type="tel" placeholder="+237 ..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase">Email <span className="text-red-600">*</span></label>
                      <input name="email" required type="text" placeholder="example@gmail.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase">Institution Name</label>
                      <input name="institution" type="text" placeholder="e.g. Bright Academy Douala" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase">Your Role</label>
                        <select name="role" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm appearance-none">
                          <option>Principal/Head</option>
                          <option>Administrator</option>
                          <option>Bursar</option>
                          <option>Proprietor</option>
                          <option>IT Manager</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase">Student Count</label>
                        <select name="students" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm appearance-none">
                          <option>1 - 100</option>
                          <option>100 - 500</option>
                          <option>500 - 1000</option>
                          <option>1000+</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send My Request <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400">By clicking, you agree to our Terms and Privacy Policy.</p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <School className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-700 tracking-tight">Acadpack</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Testimonials</button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Request a Demo
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
            <button onClick={() => scrollToSection('features')} className="text-left text-lg font-medium py-2">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left text-lg font-medium py-2">How it Works</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-left text-lg font-medium py-2">Testimonials</button>
            <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">Request a Demo</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-violet-100/50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 animate-bounce">
                <Zap className="w-3 h-3 fill-indigo-600" /> Smart Education Management
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Run Your Entire School — <span className="text-indigo-600">Smarter, Faster</span>, Fully Automated.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Acadpack is a powerful all-in-one school management system designed to streamline operations and financial management for institutions of all sizes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 group">
                  Request a Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="https://seplus.acadpack.fastwebcm.org/index.php" target='_blank'><button className="px-8 py-4 bg-white border border-slate-200 hover:border-indigo-200 text-slate-700 rounded-2xl font-bold text-lg shadow-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-50 active:scale-95">
                  See How It Works
                </button></Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-left max-w-lg mx-auto lg:mx-0">
                {[
                  "Academic Automation", "Dashboard Analytics", "Fee & Financial Tracking", "Real-time Updates", 
                  "Secure Access" , "CSV Export"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Mockup Component */}
            <div className="relative animate-in fade-in zoom-in duration-1000">
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-4 group">
                {/* Simulated UI Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-6 w-32 bg-slate-100 rounded-full" />
                </div>
                
                {/* Simulated UI Body */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8 space-y-4">
                    <div className="h-32 bg-indigo-50 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-indigo-700 uppercase">Fee Collection</span>
                        <BarChart3 className="text-indigo-300 w-8 h-8" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800">CFA 12,450,000</div>
                      <div className="h-1.5 w-full bg-indigo-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[78%] rounded-full" />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm">
                         <span className="text-[10px] text-slate-400 font-bold uppercase">Students</span>
                         <div className="text-xl font-bold">1,240</div>
                      </div>
                      <div className="h-24 bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm">
                         <span className="text-[10px] text-slate-400 font-bold uppercase">Teachers</span>
                         <div className="text-xl font-bold">84</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 h-full bg-slate-50 rounded-2xl p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <Bell className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full" />
                      <div className="h-2 w-2/3 bg-slate-200 rounded-full" />
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                       <div className="w-8 h-8 rounded-full bg-indigo-100 mx-auto" />
                       <div className="h-2 w-full bg-slate-200 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 -right-8 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transform translate-y-12 rotate-2 animate-pulse">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold">Report Generated</p>
                      <p className="text-slate-400">Class 5A • Final Term</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 -left-8 w-56 bg-indigo-900 text-white rounded-2xl shadow-xl p-4 transform -translate-y-4 -rotate-3 transition-transform hover:rotate-0 duration-500 cursor-default">
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard className="w-5 h-5 text-indigo-300" />
                    <span className="text-[10px] opacity-70">SECURE</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Fee Payment SMS</p>
                  <p className="text-xs font-medium italic">Payment confirmed for student ID #4421. Balance: CFA 0.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Trusted by Leading Schools Across Cameroon</h2>
            <p className="text-slate-500">From Buea to Douala and Bamenda, digitizing education for everyone.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center items-center">
            <Image src="/ssec.jpg" alt="SSEC-LOGO" height={50} width={120}/>
            <Image src="/hibmat.jpeg" alt="HUIB-LOGO" height={50} width={120}/>
            <Image src="/biaka.png" alt="BIAKA-LOGO" height={50} width={120}/>
            <Image src="/cuib.jpeg" alt="CUIB-LOGO" height={50} width={120}/>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Institutions", sub: "Ranging from Nursery to Uni", end: 10, suffix: "+" },
              { label: "Students", sub: "Managed every academic year", end: 100000, suffix: "+" },
              { label: "Teachers", sub: "Using our grading portals daily", end: 1000, suffix: "+" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-10 rounded-[2.5rem] bg-indigo-50/30 border border-indigo-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all group">
                <div className="text-5xl font-black text-indigo-900 mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <StatCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-bold text-slate-800 mb-1">{stat.label}</div>
                <p className="text-slate-500 text-sm">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Manual School Management is <span className="text-indigo-400">Slowing You Down</span>
            </h2>
            <p className="text-slate-400 text-lg">{`Fragmented data and paper processes lead to errors, delays, and lost revenue. It's time for a change.`}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Paper-based Mess", desc: "Sifting through physical files takes hours and records get lost easily." },
              { title: "Grading Errors", desc: "Manual calculations lead to mistakes in report cards and transcripts." },
              { title: "Fee Leakage", desc: "Difficulty tracking who owes what leads to critical revenue loss." },
              { title: "Zero Visibility", desc: "No real-time data to help administrators make informed decisions." },
              { title: "Poor Transparency", desc: "Parents are left in the dark about grades, attendance, and finances." },
              { title: "Admin Overload", desc: "Teachers spend more time on paperwork than teaching students." }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-16 border-t border-white/10 text-center">
             <p className="text-xl italic text-slate-300">{"Acadpack eliminates all of this with a fully integrated digital solution."}</p>
          </div>
        </div>
      </section>

      {/* Features - Academic */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
                <div className="aspect-square rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center justify-center text-center animate-in slide-in-from-bottom-10">
                            <Users className="w-10 h-10 text-indigo-600 mb-4" />
                            <p className="font-bold text-slate-800">Registration</p>
                            <p className="text-xs text-slate-400">Manual & CSV Import</p>
                        </div>
                        <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center text-white delay-75 animate-in slide-in-from-bottom-10">
                            <BookOpen className="w-10 h-10 mb-4" />
                            <p className="font-bold">Course Control</p>
                            <p className="text-xs opacity-70">Assign Subjects</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center justify-center text-center delay-150 animate-in slide-in-from-bottom-10">
                            <Lock className="w-10 h-10 text-amber-500 mb-4" />
                            <p className="font-bold text-slate-800">Deadlines</p>
                            <p className="text-xs text-slate-400">Auto Subject Locking</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center justify-center text-center delay-300 animate-in slide-in-from-bottom-10">
                            <Download className="w-10 h-10 text-emerald-500 mb-4" />
                            <p className="font-bold text-slate-800">Transcripts</p>
                            <p className="text-xs text-slate-400">PDF Generation</p>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Academic Module</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-8 leading-tight">
                Complete Academic Control at Your Fingertips
              </h2>
              <div className="space-y-6">
                {[
                  "Student registration (manual + CSV bulk upload)",
                  "Staff & teacher management with role assignments",
                  "Automated report cards & transcript generation",
                  "Secure subject locking after grading deadlines",
                  "Teacher portal for simplified grade entry"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">{feature}</p>
                  </div>
                ))}
              </div>
              <Link href="https://seplus.acadpack.fastwebcm.org/acadx/index.php" target='_blank'><button className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 group">
                Explore Academic Module <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Finance */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Finance Module</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-8 leading-tight">
                Smart Financial Management Made Simple
              </h2>
              <div className="space-y-6">
                {[
                    "Custom fee structures by class or department",
                    "Real-time tracking of payments & balances",
                    "Automatic PDF receipt generation",
                    "Instant SMS notifications to guardians on payment",
                    "Detailed financial reporting & transparency logs"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">{feature}</p>
                  </div>
                ))}
              </div>
              <Link href="https://seplus.acadpack.fastwebcm.org/finance/" target="_blank"><button className="mt-10 px-8 py-4 bg-emerald-600 cursor-pointer text-white rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2 group">
                Explore Finance Module <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button></Link>
            </div>
            <div className="relative">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-200">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="font-bold text-slate-800">Financial Overview</h4>
                            <p className="text-xs text-slate-400">Total Revenue • Oct 2023</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <PieChart className="w-6 h-6" />
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {[
                            { name: "Tuition Fees", val: "CFA 8,240,000", p: "82%" },
                            { name: "Uniforms", val: "CFA 1,120,000", p: "11%" },
                            { name: "Registration", val: "CFA 680,000", p: "7%" }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-slate-700">{item.name}</span>
                                    <span className="text-slate-500">{item.val}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full">
                                    <div className={`h-full bg-indigo-500 rounded-full`} style={{width: item.p}} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Bell className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold tracking-wide">SMS NOTIFICATION</span>
                        </div>
                        <p className="text-sm italic text-slate-400 leading-relaxed">
                            {"Guardian of Student #102 has been notified of payment CFA 50,000. Balance: CFA 0."}
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Get Started in 3 Simple Steps</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Our streamlined onboarding ensures your school is up and running digitally in no time.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10" />
            
            {[
              { 
                step: "01", 
                title: "Setup Institution", 
                desc: "Configure your classes, courses, and roles in our easy setup wizard.",
                icon: <Settings className="w-6 h-6" /> 
              },
              { 
                step: "02", 
                title: "Manage Academics & Finance", 
                desc: "Import students and start tracking grades and payments seamlessly.",
                icon: <BarChart3 className="w-6 h-6" /> 
              },
              { 
                step: "03", 
                title: "Automate Everything", 
                desc: "Let Acadpack handle reports, SMS, and analytics automatically.",
                icon: <Zap className="w-6 h-6" /> 
              }
            ].map((step, i) => (
              <div key={i} className="relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 text-center hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl text-white flex items-center justify-center text-2xl font-bold mx-auto mb-8 shadow-lg shadow-indigo-200 transition-transform group-hover:-translate-y-2">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">What School Leaders Are Saying</h2>
            <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 relative">
               <div className="text-6xl text-indigo-200 absolute top-6 left-6 font-serif leading-none">“</div>
               <p className="text-lg md:text-xl text-slate-700 mb-8 relative z-10 font-medium italic">
                {"The financial tracking and automated reports saved our bursar team countless hours every week. The parents love the instant SMS notifications for fee payments too!"}
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-200" />
                  <div>
                     <p className="font-bold text-slate-900">Mr. Fru N.</p>
                     <p className="text-sm text-slate-500">Proprietor, SSEC Bamenda</p>
                  </div>
               </div>
            </div>
            <div className="p-10 rounded-[2rem] bg-white border border-slate-200 relative shadow-sm hover:shadow-md transition-shadow">
               <div className="text-6xl text-slate-100 absolute top-6 left-6 font-serif leading-none">“</div>
               <p className="text-lg md:text-xl text-slate-700 mb-8 relative z-10 font-medium italic">
                 {"Acadpack completely transformed how we manage our school. Everything is now centralized, allowing our team to focus on students rather than chasing missing records."}
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200" />
                  <div>
                     <p className="font-bold text-slate-900">Mr. Morfaw E.</p>
                     <p className="text-sm text-slate-500">H.O.D, CUIB S&A Buea</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What type of schools can use Acadpack?", a: "Acadpack is built for institutions of all sizes, from nursery and primary schools to large universities and private colleges." },
              { q: "Is the system secure?", a: "Yes. We use industry-standard encryption and role-based access control (RBAC) to ensure student and financial data remains private and protected." },
              { q: "Can it handle large institutions?", a: "Absolutely. Our cloud-based architecture is designed to scale and can manage thousands of students and teachers simultaneously." },
              { q: "Does it support mobile access?", a: "Yes, our dashboard is fully responsive. Staff can enter grades and administrators can check reports from any smartphone, tablet, or PC." },
              { q: "Can it be customized for my school?", a: "We offer tailored setups during onboarding to match your specific grading systems, fee structures, and regional reporting requirements." }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors">
                <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-indigo-200">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-1/2 -left-1/4 w-[80%] h-full bg-white rounded-full blur-[120px]" />
                <div className="absolute -bottom-1/2 -right-1/4 w-[80%] h-full bg-violet-400 rounded-full blur-[120px]" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Take Control of Your School Today</h2>
              <p className="text-indigo-100 text-lg md:text-xl mb-10">Stop wasting time on manual processes. Join the growing number of schools automating with Acadpack.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://seplus.acadpack.fastwebcm.org/index.php" target='_blank'><button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95">
                  Get Started Now
                </button></Link>
                <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-indigo-500 text-white border border-indigo-400 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-400 transition-all hover:scale-105 active:scale-95">
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <School className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-slate-900">Acadpack</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6 max-w-sm">
                The most comprehensive school management system for academic excellence and financial transparency across Cameroon and beyond.
              </p>
              <div className="flex gap-4">
                <Link href="https://fastwebcm.org" target="_blank" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"><Globe className="w-5 h-5" /></Link>
                <Link href="https://www.facebook.com/profile.php?id=61584018361275#" target="_blank" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"><Users className="w-5 h-5" /></Link>
                <Link href="https://www.linkedin.com/company/112297192" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"><Star className="w-5 h-5" /></Link>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-800 mb-6">Modules</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li onClick={() => scrollToSection('features')} className="hover:text-indigo-600 cursor-pointer">Academic Module</li>
                <li onClick={() => scrollToSection('features')} className="hover:text-indigo-600 cursor-pointer">Finance Module</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-800 mb-6">Company</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li className="hover:text-indigo-600 cursor-pointer"><Link href={"https://fastwebcm.org/about"} target="_blank">About Us</Link></li>
                <li className="hover:text-indigo-600 cursor-pointer"><Link href={"https://fastwebcm.org/services"} target="_blank">Services</Link></li>
                <li className="hover:text-indigo-600 cursor-pointer"><Link href={"https://fastwebcm.org/contact"} target="_blank">Contact</Link></li>
                <li className="hover:text-indigo-600 cursor-pointer"><Link href={"https://fastwebcm.org/projects"} target="_blank">Projects</Link></li>
              </ul>
            </div>

            <div className="col-span-2">
              <h5 className="font-bold text-slate-800 mb-6">Contact Us</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li>Checkpoint, Molyko Buea, Cameroon</li>
                <li>contact@fastwebcm.org</li>
                <li>+237 677 196 252</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} <Link href="https://fastwebcm.org" className='underline text-blue-600' target="_blank">FastWEB</Link>. All rights reserved.</p>
            {/* <div className="flex gap-8">
              <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

const Settings = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default App;
