import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, MessageSquare, User } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    const payload = {
      ...formData,
      access_key: "6f08446f-55d0-4688-b383-c8f2b47a2b9b",
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
    <main id="contact" className="section bg-midnight pt-20 pb-16">
      <div className="container-custom">
        <div className="glass-card p-8 sm:p-10 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-8">Send Us a Message</h3>

          <div className="mb-4 min-h-[3rem]">
            {formStatus.submitted && (
              <p className="text-center text-green-400 p-3 rounded-md bg-green-900/30 border border-green-700/50">
                Message sent successfully! We'll get back to you soon.
              </p>
            )}
            {formStatus.error && (
              <p className="text-center text-red-400 p-3 rounded-md bg-red-900/30 border border-red-700/50">
                Error: {formStatus.error}
              </p>
            )}
          </div>

          <form onSubmit={handleContactSubmit} className={`space-y-4 ${formStatus.submitted ? 'opacity-50 pointer-events-none' : ''}`}>
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
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>

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
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                disabled={formStatus.submitting || formStatus.submitted}
              />
            </div>

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
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50 resize-none"
                disabled={formStatus.submitting || formStatus.submitted}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-primary px-8 py-3 rounded-xl shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={formStatus.submitting || formStatus.submitted}
            >
              {formStatus.submitting ? 'Sending...' : formStatus.submitted ? 'Message Sent' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;