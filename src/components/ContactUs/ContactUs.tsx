

import { useState } from "react";
import emailjs from "@emailjs/browser";
import EmailImage from "../../../assets/Images/ContactUs/Email.svg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_FED_2025",
        "template_4oqf9hr",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "_HGycPfhu40ieVU-0"
      )
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row justify-center items-center py-16 px-6 gap-10">

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-[#563A9C] mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have questions or feedback ? Fill out the form
          below — we’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563A9C]"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563A9C]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563A9C]"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#563A9C] text-white py-2 rounded-lg hover:bg-[#472F85] transition duration-200"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
        )}
      </div>

      <div className="w-full max-w-md flex justify-center">
        <img
          src={EmailImage}
          className="w-full h-auto object-contain"
          alt="Email Illustration"
        />
      </div>
    </div>
  );
};

export default ContactUs;

