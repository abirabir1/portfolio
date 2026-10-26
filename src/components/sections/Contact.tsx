"use client";

import { CheckCircle2, Loader2, Mail, MapPin, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialLinks";
import { type L, profile } from "@/data/portfolio";
import { ui } from "@/data/ui";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, L>>;
type Status = "idle" | "sending" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = ui.contact.required;
  if (!values.email.trim()) errors.email = ui.contact.required;
  else if (!emailPattern.test(values.email.trim())) errors.email = ui.contact.invalidEmail;
  if (!values.message.trim()) errors.message = ui.contact.required;
  else if (values.message.trim().length < 10) errors.message = ui.contact.tooShort;
  return errors;
}

const channels = [
  { label: ui.contact.email, value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: { fr: "LinkedIn", en: "LinkedIn" }, value: "abir-el-abed", href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: { fr: "GitHub", en: "GitHub" }, value: "abirabir1", href: profile.socials.github, Icon: GithubIcon },
].filter((c) => c.href);

export function Contact() {
  const { t } = usePreferences();
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Fields) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = (["name", "email", "message"] as const).find((f) => found[f]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    // Sans ID Formspree : ouverture de la messagerie avec le message pré-rempli
    if (!profile.formspreeId) {
      const subject = encodeURIComponent(`Portfolio — ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (field: keyof Fields) =>
    `w-full rounded-xl border bg-bg/50 px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors focus:border-violet focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 ${
      touched[field] && errors[field] ? "border-pink" : "border-border-strong"
    }`;

  const errorText = (field: keyof Fields) =>
    touched[field] && errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-pink-soft">
        {t(errors[field]!)}
      </p>
    ) : null;

  return (
    <Section id="contact" {...ui.sections.contact} intro={ui.contact.intro}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-3">
          {channels.map(({ label, value, href, Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass glow-border flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-fg-subtle">{t(label)}</span>
                <span className="block truncate font-medium text-fg">{value}</span>
              </span>
            </a>
          ))}
          <div className="glass flex items-center gap-4 rounded-2xl p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border-strong text-pink">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-fg-subtle">{t(ui.about.location)}</span>
              <span className="block font-medium text-fg">{t(profile.location)}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
            <form noValidate onSubmit={onSubmit} className="glass space-y-5 rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-fg">
                    {t(ui.contact.name)}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={update("name")}
                    onBlur={blur("name")}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "contact-name-error" : undefined}
                    className={fieldClass("name")}
                  />
                  {errorText("name")}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-fg">
                    {t(ui.contact.email)}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update("email")}
                    onBlur={blur("email")}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "contact-email-error" : undefined}
                    className={fieldClass("email")}
                  />
                  {errorText("email")}
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-fg">
                  {t(ui.contact.message)}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={update("message")}
                  onBlur={blur("message")}
                  aria-invalid={Boolean(touched.message && errors.message)}
                  aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
                  className={`${fieldClass("message")} resize-y`}
                />
                {errorText("message")}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 font-semibold text-white shadow-lg shadow-violet/30 transition-shadow hover:shadow-xl hover:shadow-pink/30 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                  {t(status === "sending" ? ui.contact.sending : ui.contact.send)}
                </button>
                <div aria-live="polite" className="text-sm">
                  {status === "success" && (
                    <p className="flex items-center gap-2 text-emerald-400 light:text-emerald-700">
                      <CheckCircle2 className="size-4" aria-hidden />
                      {t(ui.contact.success)}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="flex items-center gap-2 text-pink-soft">
                      <TriangleAlert className="size-4" aria-hidden />
                      {t(ui.contact.error)}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
      </div>
    </Section>
  );
}
