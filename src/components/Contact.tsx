import React, { useState, ChangeEvent, FormEvent } from 'react';
// Using lucide-react icons for consistency with Footer.tsx
import { Mail, Linkedin, Send, CheckCircle, Loader2, User, MessageSquare } from 'lucide-react';

// Placeholder for teamMembers data if not available
// import { teamMembers } from '../data/teamMembers'; // Adjust the path as necessary
const teamMembers = [
  // --- CORRECTED LINKEDIN URLs ---
  { name: "Pranav Adya", title: "Co-Founder", linkedin: "https://www.linkedin.com/in/pranav-adya-999a36272" }, // Correct URL for Pranav
  { name: "Amol Tandon", title: "Co-Founder", linkedin: "https://www.linkedin.com/in/amol-tandon-a11971205" }, // Correct URL for Amol
  // --- END CORRECTION ---
  { name: "Rohit Seshadri", title: "Co-Founder", linkedin: "https://www.linkedin.com/in/rohit-seshadri" },
    // Add other members as needed, ensure structure matches usage
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

function Contact() {
  // Filter team members for LinkedIn links
  const linkedInProfiles = teamMembers
    .filter(m => m.title !== 'Chief Morale Officer') // Example filter remains
    .map(member => ({ name: member.name, url: member.linkedin || '#' })); // Ensure fallback if URL is missing

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>({ submitting: false, submitted: false, error: null });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    const payload = {
      ...formData,
      access_key: "6f08446f-55d0-4688-b383-c8f2b47a2b9b", // Replace with your Web3Forms Access Key if needed
      subject: `New Message from ${formData.name} via Website`,
      from_name: formData.name,
      replyto: formData.email,
      botcheck: ""
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setFormStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Submission failed response:", resData);
        setFormStatus({ submitting: false, submitted: false, error: resData.message || 'Submission failed.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setFormStatus({ submitting: false, submitted: false, error: `An error occurred: ${errorMessage}.` });
    }
  };

  return (
    // Updated main background to match footer's dark theme approach
    <main id="contact-section" className="section bg-midnight pt-20 pb-16"> {/* Changed background, added specific ID */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Left Column: Contact Info - Updated Styles */}
        <div className="glass-card p-8 sm:p-10 rounded-xl"> {/* Use glass-card style */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center md:text-left text-white">Contact Us</h2>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-200 mb-3">Email Us</h3>
            <a href="mailto:thecollieteam@gmail.com" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white text-lg transition-colors duration-200">
              <Mail size={20} /> {/* Lucide icon */}
              thecollieteam@gmail.com
            </a>
            <p className="text-gray-400 text-sm mt-2">We typically respond within 24 hours.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">Connect on LinkedIn</h3>
             {/* Fixed overlap: Use flex column layout for links */}
            <div className="flex flex-col space-y-3">
              {linkedInProfiles.map(profile => (
                <a
                  key={profile.name}
                  href={profile.url} // This now uses the corrected URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors duration-200" // Changed to flex, removed mr-4
                >
                  <Linkedin size={20} /> {/* Lucide icon */}
                  {profile.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">Location</h3>
            <p className="text-gray-300">Champaign, IL</p>
          </div>
        </div>

        {/* Right Column: Contact Form - Updated Styles */}
        <div className="glass-card p-8 sm:p-10 rounded-xl h-full flex flex-col justify-center"> {/* Use glass-card style */}
          <h3 className="text-2xl font-semibold text-gray-200 mb-6 text-center">Send Us a Message</h3>
          {/* Status Message Area - Updated Styles */}
          <div className="mb-4 min-h-[3rem]">
            {formStatus.submitted && (
              // Match footer success style
              <p className="text-center text-green-400 p-3 rounded-md bg-green-900/30 border border-green-700/50">
                 Message sent successfully! We'll get back to you soon.
              </p>
            )}
            {formStatus.error && (
               // Match footer error style
              <p className="text-center text-red-400 p-3 rounded-md bg-red-900/30 border border-red-700/50">
                Error: {formStatus.error}
              </p>
            )}
          </div>

          {/* Form Area - Updated Styles */}
          <form onSubmit={handleContactSubmit} className={`space-y-4 ${formStatus.submitted ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Name Input */}
            <div className="relative">
               <label htmlFor="contact-name" className="sr-only">Name</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <User size={18} className="text-gray-400" />
               </div>
               <input
                 type="text"
                 id="contact-name"
                 name="name"
                 value={formData.name}
                 onChange={handleInputChange}
                 placeholder="Your Name"
                 required
                 // Match footer input style
                 className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                 disabled={formStatus.submitting || formStatus.submitted}
               />
            </div>
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="contact-email" className="sr-only">Email</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Mail size={18} className="text-gray-400" />
               </div>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                // Match footer input style
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>
            {/* Message Textarea */}
            <div className="relative">
              <label htmlFor="contact-message" className="sr-only">Message</label>
               <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                   <MessageSquare size={18} className="text-gray-400" />
               </div>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
                 // Match footer input style (adjust padding for icon)
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50 resize-none"
                disabled={formStatus.submitting || formStatus.submitted}
              ></textarea>
            </div>
            {/* Submit Button - Updated Styles & Icon */}
            <div className="text-center pt-2">
              <button
                type="submit"
                 // Use btn-primary defined in index.css
                className="btn btn-primary px-8 py-3 rounded-xl shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2" // Added gap for icon spacing
                disabled={formStatus.submitting || formStatus.submitted}
              >
                {formStatus.submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> {/* Lucide spinner */}
                    <span>Sending...</span>
                  </>
                ) : formStatus.submitted ? (
                  <>
                    <CheckCircle size={18} /> {/* Lucide success icon */}
                    <span>Message Sent</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} /> {/* Lucide send icon */}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
