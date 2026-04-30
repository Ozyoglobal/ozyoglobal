"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "general",
    message: "",
  });

  const subjectKeys = ["dmc", "mice", "production", "location", "general"] as const;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await new Promise((res) => setTimeout(res, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "general", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">Teşekkürler!</h3>
        <p className="text-zinc-500">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
            {t("name")} *
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
            {t("email")} *
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
            {t("phone")}
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
            {t("company")}
          </label>
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
          {t("subject")}
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-white"
        >
          {subjectKeys.map((key) => (
            <option key={key} value={key}>
              {t(`subjects.${key}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide">
          {t("message")} *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-zinc-900 text-white font-semibold py-4 px-8 rounded-xl hover:bg-zinc-700 transition-all duration-200 text-sm disabled:opacity-60"
      >
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
