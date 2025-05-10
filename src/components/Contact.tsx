import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    const payload = {
      ...formData,
      access_key: "6f08446f-55d0-4688-b383-c8f2b47a2b9b",
      subject: `New Message from ${formData.name} via Website`,
      from_name: formData.name,
      replyto: formData.email,
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
        setFormStatus({ submitting: false, submitted: false, error: resData.message || 'Submission failed.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormStatus({ submitting: false, submitted: false, error: `An error occurred: ${error.message}.` });
    }
  };

  const faqs = [
    {
      question: "How does the Collie collar track my dog's vitals?",
      answer: "Collie uses advanced sensors to continuously monitor your dog's heart rate, respiration, temperature, and movement patterns. These non-invasive sensors maintain contact with your dog's skin through the collar, collecting data that is then processed by our AI algorithms."
    },
    {
      question: "Is the collar comfortable for my dog to wear?",
      answer: "Yes, Collie is designed with comfort as a priority. The collar is lightweight, adjustable, and made from hypoallergenic materials. The sensors are low-profile and contoured to fit comfortably against your dog's neck."
    },
    {
      question: "How long does the battery last?",
      answer: "The Collie collar's rechargeable battery typically lasts 5-7 days on a single charge, depending on usage and settings. Charging takes approximately 2 hours using the included magnetic charging cable."
    }
  ];

  return (
    <div className="container-custom py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">Have Questions?</h2>
          <p className="text-gray-300 mb-6">Send us a message and we'll get back to you within 24 hours.</p>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <MessageSquare size={18} className="text-gray-400" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus.submitting}
              className="btn-primary w-full flex items-center justify-center"
            >
              {formStatus.submitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Sending...
                </>
              ) : formStatus.submitted ? (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="mr-2" size={20} />
                  Send Message
                </>
              )}
            </button>

            {formStatus.error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {formStatus.error}
              </div>
            )}
          </form>
        </div>

        {/* FAQs */}
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;