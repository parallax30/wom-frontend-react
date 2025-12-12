"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ContactFormProps {
  user: {
    name: string;
    email: string;
  };
}

export default function ContactForm({ user }: ContactFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const isDisabled =
    !fullName.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim() ||
    sending;

  const handleSubmit = async () => {
    try {
      setSending(true);

      const payload = {
        fullName,
        email,
        subject,
        message,
      };

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSent(true);
      setTimeout(() => {
        router.push("/portal");
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mt-20 px-10 py-16 relative w-[80%] mx-auto">
      {/* Background Image Circle */}
      <div className="absolute left-[-10%] top-[10%] w-[600px] h-[600px] opacity-60 -z-10">
      <Image
        src="/assets/contact-bg.png"
        alt="Background shape"
        fill
        className="object-contain rounded-full"
      />
    </div>

      <div className="flex flex-col md:flex-row gap-20">
        {/* LEFT SECTION */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-10">Contact</h2>

          <div className="flex items-start gap-4 mb-10">
            <Image
              src="/assets/icons/email-contact-icon.png"
              alt="email"
              width={44}
              height={44}
            />
            <div>
              <p className="font-semibold text-lg">Contact Email</p>
              <p className="text-[#C52A6C] font-semibold">example@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Image
              src="/assets/icons/phone-contact-icon.png"
              alt="phone"
              width={44}
              height={44}
            />
            <div>
              <p className="font-semibold text-lg">Contact Phone</p>
              <p className="text-[#C52A6C] font-semibold">+56 9 12345678</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — FORM */}
        <div className="flex-1 ">
          {/* FULL NAME */}
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-6"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* EMAIL */}
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SUBJECT */}
          <label className="block font-semibold mb-1">Subject</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-6"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* MESSAGE */}
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            className="w-full border border-gray-400 rounded-xl px-4 py-3 h-40 mb-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* SEND BUTTON */}
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition
              ${isDisabled ? "bg-pink-200 text-white" : "bg-[#E6007E] text-white hover:bg-pink-700"}
            `}
          >
            {sending && "Sending..."}
            {sent && "Message Sent ✓"}
            {!sending && !sent && "SEND"}
          </button>
        </div>
      </div>
    </section>
  );
}
