import React, { useState, useRef } from 'react';
import { Mail, Phone,Send, CheckCircle } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import hCaptcha component

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null); // State for hCaptcha token
  const hcaptchaRef = useRef<HCaptcha>(null); // Ref for hCaptcha widget

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleHcaptchaChange = (token: string | null) => {
    setHcaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hcaptchaToken) {
      alert('Please complete the hCaptcha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/submit_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, hcaptchaToken }), // Send formData along with hcaptchaToken
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend response:', result);
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
        // Optionally, handle error state or display an error message to the user
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      // Optionally, handle network error state
    } finally {
      // Reset hCaptcha regardless of submission success/failure
      hcaptchaRef.current?.resetCaptcha();
      setHcaptchaToken(null); // Clear the token
    }

    // Reset form after 3 seconds, regardless of submission success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to enhance your security infrastructure? Contact us for detailed consultations,
            custom solutions, and competitive quotations tailored to your specific requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Removed the Contact Info Display section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg"> {/* Adjusted grid span */}
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-slate-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1"> {/* Adjusted grid-cols to 1 since 'organization' is removed */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="afis">AFIS Solutions</option>
                    <option value="abis">ABIS Systems</option>
                    <option value="frs">Facial Recognition</option>
                    <option value="scanners"> Scanners</option>
                    <option value="iris">Iris Recognition</option>
                    <option value="cards">Card Printers</option>
                    <option value="integration">System Integration</option>
                    <option value="support">Technical Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="Please describe your requirements, project details, or any specific questions you have..."
                  ></textarea>
                </div>

                {/* hCaptcha Widget */}
                <div className="flex justify-center">
                  <HCaptcha
                    sitekey="3248f8f8-a382-4850-90e0-28625f462036" // <--- IMPORTANT: Replace with your hCaptcha site key
                    onVerify={handleHcaptchaChange}
                    ref={hcaptchaRef} // Assign the ref
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors duration-200 flex items-center justify-center"
                  disabled={!hcaptchaToken} // Disable button until hCaptcha is completed
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            For urgent inquiries or immediate technical support, our team is ready to assist you.
            Contact us directly for faster response times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+914023119900"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold transition-colors duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call: +91-40-23119900
            </a>
            <a
              href="mailto:info@multywave.co.in"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 font-semibold transition-all duration-200"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email: info@multywave.co.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;