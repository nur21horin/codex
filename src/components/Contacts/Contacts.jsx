import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  // LIVE VALIDATION
  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.includes("@")) err.email = "Valid email required";
    if (!form.message.trim()) err.message = "Message cannot be empty";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // remove error while typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Toast.fire({
        icon: "error",
        title: "Fix form errors",
      });
      return;
    }

    setLoading(true);
    setProgress(10);

    // Sweet loading modal
    Swal.fire({
      title: "Sending message...",
      html: '<b>0%</b> completed',
      allowOutsideClick: false,
      background: "var(--color-card)",
      color: "var(--color-text)",
      didOpen: () => Swal.showLoading(),
    });

    // fake progress animation
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 20;

        Swal.update({
          html: `<b>${Math.min(next, 95).toFixed(0)}%</b> completed`,
        });

        return next;
      });
    }, 300);

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      clearInterval(interval);
      setProgress(100);
      Swal.close();

      // 🎉 CONFETTI SUCCESS
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      Toast.fire({
        icon: "success",
        title: "Message sent successfully 🚀",
      });

      setForm({ name: "", email: "", message: "" });
      setProgress(0);
    } catch (err) {
      clearInterval(interval);
      Swal.close();

      Toast.fire({
        icon: "error",
        title: "Failed to send message",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text px-4 py-10">

      <div className="w-full max-w-xl bg-card border border-muted shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary">
          Contact Support
        </h1>

        <p className="text-center text-muted text-sm mt-1 mb-6">
          We usually respond within 24 hours ⚡
        </p>

        {/* PROGRESS BAR */}
        {loading && (
          <div className="w-full bg-muted/30 h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full px-4 py-2 rounded-lg bg-bg border ${
                errors.name ? "border-red-500 animate-pulse" : "border-muted"
              } outline-none focus:border-primary`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full px-4 py-2 rounded-lg bg-bg border ${
                errors.email ? "border-red-500 animate-pulse" : "border-muted"
              } outline-none focus:border-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              className={`w-full px-4 py-3 h-32 rounded-lg bg-bg border ${
                errors.message ? "border-red-500 animate-pulse" : "border-muted"
              } outline-none focus:border-primary resize-none`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 active:scale-[0.98] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Contact;