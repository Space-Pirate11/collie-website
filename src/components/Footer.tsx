import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Activity, Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail } from 'lucide-react'; // Added Mail icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- Subscription Form State and Logic ---
  const [email, setEmail] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>("idle");

  // IMPORTANT: Replace this with your actual deployed Google Apps Script Web App URL
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbx8avnNJds9aAt6nNk1U6rMkA2ZVO_2W7IZc2SN-7-TfyNcHYM7R0AolYOACShy4xnGNA/exec';
  // Example URL from your JS code (ensure this is your correct deployed URL):
  // const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbx8avnNJds9aAt6nNk1U6rMkA2ZVO_2W7IZc2SN-7-TfyNcHYM7R0AolYOACShy4xnGNA/exec';

  const handleSubscribeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!googleAppsScriptUrl || googleAppsScriptUrl === 'https://script.google.com/macros/s/AKfycbx8avnNJds9aAt6nNk1U6rMkA2ZVO_2W7IZc2SN-7-TfyNcHYM7R0AolYOACShy4xnGNA/exec') {
        setResponseMessage("Configuration error: Apps Script URL is not set.");
        setStatus("error");
        return;
    }
    setResponseMessage("");
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch(googleAppsScriptUrl, {
        method: "POST",
        body: formData,
        // Google Apps Script web apps often require redirect handling to be manual
        // mode: 'no-cors', // Try this if you encounter CORS issues, but it hides the response
      });

      // Check if the response status code indicates success (e.g., 2xx or a specific redirect)
      // Google Scripts often return a 302 redirect on success when configured for HTML output,
      // or a 200 with simple text/JSON when configured as an API.
      // Fetch API follows redirects by default, so a successful POST might resolve with res.ok = true.
      if (res.ok) {
         // Try to parse JSON, but Google Scripts might just return text or redirect
        try {
            const data = await res.json(); // Assuming your script returns { status: 'success' } or similar
            if (data && data.status === "success") {
                 setResponseMessage("Thanks for subscribing! We'll keep you updated.");
                 setStatus("success");
                 setEmail(""); // Clear the input
            } else {
                 // If JSON is returned but doesn't indicate success
                 setResponseMessage(data.message || "Subscription processed, but status unclear.");
                 setStatus("success"); // Assume success if OK but not standard success message
                 setEmail("");
            }
        } catch (jsonError) {
            // If the response was OK but not JSON (e.g., simple text "Success" or HTML page), assume success.
            console.log("Response OK but not JSON, assuming success.", jsonError);
            setResponseMessage("Thanks for subscribing! We'll keep you updated.");
            setStatus("success");
            setEmail("");
        }

      } else {
        // Handle specific error codes if necessary
        console.error("Subscription failed response:", res.status, res.statusText);
        setResponseMessage(`Subscription failed (${res.status}). Please try again later.`);
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription submission error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResponseMessage(`An error occurred: ${errorMessage}. Please try again.`);
      setStatus("error");
    }
  };
  // --- End Subscription Form Logic ---


  return (
    <footer id="contact" className="pt-20 pb-10 bg-charcoal border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* --- Updated Subscription Card --- */}
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Get Launch Updates</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know when Collie becomes available and get exclusive early-bird offers.
            </p>
            {/* Integrate the form directly here */}
            <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-3">
               <label htmlFor="email-subscribe" className="sr-only">Email address</label>
               <div className="relative flex-grow">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Mail size={18} className="text-gray-400" /> {/* Using Lucide Mail icon */}
                   </div>
                   <input
                       id="email-subscribe"
                       name="email"
                       type="email"
                       value={email}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                       placeholder="Enter your email"
                       required
                       disabled={status === 'submitting'}
                       className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 disabled:opacity-50"
                   />
               </div>
               <button
                   type="submit"
                   disabled={status === 'submitting' || status === 'success'} // Also disable on success?
                   className="btn-primary flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
               >
                 {status === 'submitting' ? (
                   'Subscribing...'
                 ) : status === 'success' ? (
                   'Subscribed!'
                 ) : (
                    <>Subscribe <ArrowRight size={16} className="ml-2" /></>
                 )}
               </button>
            </form>
            {/* Display Response Message */}
            <div className="mt-3 min-h-[1.5rem]">
                {responseMessage && (
                  <p className={`text-sm ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
                    {responseMessage}
                  </p>
                )}
                {googleAppsScriptUrl === 'https://script.google.com/macros/s/AKfycbx8avnNJds9aAt6nNk1U6rMkA2ZVO_2W7IZc2SN-7-TfyNcHYM7R0AolYOACShy4xnGNA/exec' && status !== 'submitting' && (
                    <p className="text-xs text-yellow-500 mt-1">Note: Subscription endpoint not configured.</p>
                )}
            </div>
             {/* Optional: Add the "No spam" note */}
             {(status === 'idle' || status === 'error') && !responseMessage && (
                  <p className="text-xs text-gray-500 mt-2">No spam. Only occasional updates. 🐾</p>
             )}
          </div>
          {/* --- End Updated Subscription Card --- */}

          {/* --- Right Column (Unchanged) --- */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                <Activity size={28} strokeWidth={1.5} />
                <span className="text-xl font-bold">Collie</span>
              </div>
              <p className="text-gray-300 mb-6">
                The AI-powered smart collar for continuous canine health monitoring.
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Connect with us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition" aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
           {/* --- End Right Column --- */}
        </div>

        {/* --- Footer Bottom (Unchanged) --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Collie Health Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Support</a>
          </div>
        </div>
         {/* --- End Footer Bottom --- */}
      </div>
    </footer>
  );
};

export default Footer;