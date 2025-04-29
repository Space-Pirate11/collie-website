import React, { useState, ChangeEvent, FormEvent } from 'react';
// Assuming you have an Icon component and teamMembers data defined elsewhere
// import Icon from './Icon'; // Adjust the path as necessary
// import { teamMembers } from '../data/teamMembers'; // Adjust the path as necessary

// Placeholder for Icon component if you don't have one
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <span className={className}>[{name}]</span> // Simple text representation
);

// Placeholder for teamMembers data if not available
const teamMembers = [
    { name: "Alice", title: "Developer", linkedin: "#" },
    { name: "Bob", title: "Designer", linkedin: "#" },
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
  // Filter team members for LinkedIn links (adjust filter logic if needed)
  const linkedInProfiles = teamMembers
    .filter(m => m.title !== 'Chief Morale Officer') // Example filter
    .map(member => ({ name: member.name, url: member.linkedin || '#' }));

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
      access_key: "6f08446f-55d0-4688-b383-c8f2b47a2b9b", // <<<--- IMPORTANT: Replace with your actual Web3Forms Access Key
      subject: `New Message from ${formData.name} via Website`,
      // Optional: customize email content further if web3forms supports it
      from_name: formData.name, // Example: Set sender name if supported
      replyto: formData.email, // Example: Set reply-to if supported
      // Add the target email - web3forms usually handles this via the access key dashboard,
      // but you can sometimes specify it or related fields in the payload.
      // Check web3forms documentation for sending to specific emails if needed.
      // For this example, we assume the access key is tied to thecollieteam@gmail.com
      botcheck: "" // web3forms bot check
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
        setFormData({ name: '', email: '', message: '' }); // Clear form on success
        // Optional: Hide form or show success message more permanently
      } else {
        console.error("Submission failed response:", resData);
        setFormStatus({ submitting: false, submitted: false, error: resData.message || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setFormStatus({ submitting: false, submitted: false, error: `An error occurred: ${errorMessage}. Please try again.` });
    }
  };

  return (
    <main id="contact" className="section bg-gradient-to-br from-blue-50 to-indigo-100"> {/* Added section class and ID */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column: Contact Info */}
        <div className="bg-white text-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl animate-fade-in-left">
          <h2 className="text-3xl sm:text-4xl mb-8 text-center md:text-left">Contact Us</h2>
          <div className="mb-8">
            <h3 className="text-2xl text-gray-700 mb-3">Email Us</h3>
            <a href="mailto:thecollieteam@gmail.com" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-lg transition-colors duration-200">
              <Icon name="Mail" className="w-5 h-5" /> thecollieteam@gmail.com
            </a>
            <p className="text-gray-500 text-sm mt-2">We typically respond within 24 hours.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl text-gray-700 mb-4">Connect on LinkedIn</h3>
            <div className="space-y-3">
              {linkedInProfiles.map(profile => (
                <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 mr-4">
                  <Icon name="Linkedin" className="w-5 h-5" /> {profile.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl text-gray-700 mb-2">Location</h3>
            <p className="text-gray-600">Champaign, IL</p> {/* Make sure this location is correct */}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white text-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl animate-fade-in-right h-full flex flex-col justify-center">
          <h3 className="text-2xl text-gray-700 mb-4 text-center">Send Us a Message</h3>
          <div className="mb-4 min-h-[3rem]"> {/* Increased min-height for message */}
            {formStatus.submitted && (
              <p className="text-center text-green-600 bg-green-100 p-3 rounded-md border border-green-300">Message sent successfully! We'll get back to you soon.</p>
            )}
            {formStatus.error && (
              <p className="text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-300">Error: {formStatus.error}</p>
            )}
          </div>
          {/* Keep showing form or hide after submission based on preference */}
          {/* {!formStatus.submitted && ( */}
            <form onSubmit={handleContactSubmit} className={`space-y-4 ${formStatus.submitted ? 'opacity-50' : ''}`}> {/* Example: Dim form after submit */}
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formStatus.submitting || formStatus.submitted} // Disable after submitting/success
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formStatus.submitting || formStatus.submitted}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formStatus.submitting || formStatus.submitted}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-8 py-3 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled style
                  disabled={formStatus.submitting || formStatus.submitted}
                >
                  {formStatus.submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : formStatus.submitted ? (
                     <>Message Sent <Icon name="CheckCircle" className="w-4 h-4 ml-2" /></> // Indicate success
                  ) : (
                    <>Send Message <Icon name="Send" className="w-4 h-4 ml-2" /></>
                  )}
                </button>
              </div>
            </form>
          {/* )} */}
        </div>
      </div>
    </main>
  );
}

export default Contact;