import { useEffect, useRef, useState } from 'react';
import { Icon, SocialIcon } from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { profile } from '../data/profile.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;
  return (
    <div className="fl-toasts">
      <div className={`fl-toast fl-toast--${toast.kind}`} role="status">
        <Icon name={toast.kind === 'success' ? 'check-circle' : 'alert-circle'} />
        <div>
          <p className="fl-toast__title">{toast.title}</p>
          <p className="fl-toast__msg">{toast.message}</p>
        </div>
        <button
          type="button"
          className="fl-iconbtn fl-iconbtn--ghost fl-iconbtn--sm"
          aria-label="Dismiss"
          onClick={onClose}
        >
          <Icon name="close" size="sm" />
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const firstInvalid = useRef(null);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell me your name.';
    if (!values.email.trim()) next.email = 'I need an address to reply to.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'That does not look like an email address.';
    if (!values.message.trim()) next.message = 'Say a little about what you have in mind.';
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      firstInvalid.current?.focus();
      setToast({
        kind: 'error',
        title: 'Not sent',
        message: 'A couple of fields still need filling in.',
      });
      return;
    }

    // No backend: hand the message to the visitor's own mail client.
    const subject = `Hello from ${values.name.trim()} — fabianl4bs.dev`;
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setToast({
      kind: 'success',
      title: 'Opening your mail app',
      message: `The message is addressed to ${profile.email} — press send there and it reaches me.`,
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setToast({
        kind: 'error',
        title: 'Could not copy',
        message: `The address is ${profile.email}.`,
      });
    }
  };

  const details = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'map-pin', label: 'Location', value: profile.location },
  ];

  return (
    <section className="fl-section fl-anchor" id="contact">
      <div className="fl-container">
        <SectionHeader
          eyebrow="// 05 — contact"
          title="Got a project, a paper or a question?"
          intro="Internships, research collaborations, freelance builds — or just a question about one of the projects. I usually reply within two days."
        />

        <div className="fl-contact">
          <form className="fl-form" onSubmit={onSubmit} noValidate>
            <div className="fl-field">
              <label className="fl-label" htmlFor="c-name">
                Full name
              </label>
              <input
                id="c-name"
                className="fl-input"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={set('name')}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'c-name-err' : undefined}
                ref={errors.name ? firstInvalid : undefined}
              />
              {errors.name && (
                <p className="fl-hint fl-hint--error" id="c-name-err">
                  <Icon name="alert-circle" size="sm" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="fl-field">
              <label className="fl-label" htmlFor="c-email">
                Email address
              </label>
              <input
                id="c-email"
                className="fl-input"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set('email')}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'c-email-err' : undefined}
                ref={!errors.name && errors.email ? firstInvalid : undefined}
              />
              {errors.email && (
                <p className="fl-hint fl-hint--error" id="c-email-err">
                  <Icon name="alert-circle" size="sm" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="fl-field">
              <label className="fl-label" htmlFor="c-message">
                Your message
              </label>
              <textarea
                id="c-message"
                className="fl-input"
                rows={6}
                value={values.message}
                onChange={set('message')}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'c-message-err' : 'c-message-hint'}
                ref={!errors.name && !errors.email && errors.message ? firstInvalid : undefined}
              />
              {errors.message ? (
                <p className="fl-hint fl-hint--error" id="c-message-err">
                  <Icon name="alert-circle" size="sm" />
                  {errors.message}
                </p>
              ) : (
                <p className="fl-hint" id="c-message-hint">
                  <Icon name="mail" size="sm" />
                  This opens your own mail app with the message ready to send — nothing is stored here.
                </p>
              )}
            </div>

            <button type="submit" className="fl-btn fl-btn--primary fl-btn--block">
              <Icon name="send" />
              <span>Send message</span>
            </button>
          </form>

          <aside className="fl-contact__side">
            {/* One card, not two. "Details" and "Elsewhere" were the same thing split in half —
                every way of reaching him — and the split made the shorter one look like an
                afterthought. The social links are a way of reaching him, so they live here. */}
            <section className="fl-skill">
              <h3 className="fl-skill__head">
                <span className="fl-skill__icon">
                  <Icon name="user" />
                </span>
                <span className="fl-skill__title">Details</span>
              </h3>
              <ul className="fl-details">
                {details.map((d) => (
                  <li key={d.label}>
                    <Icon name={d.icon} size="sm" />
                    <div>
                      <p className="fl-details__label">{d.label}</p>
                      {d.href ? (
                        <a className="fl-details__value fl-details__link" href={d.href}>
                          {d.value}
                        </a>
                      ) : (
                        <p className="fl-details__value">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
                <li>
                  <Icon name="send" size="sm" />
                  <div>
                    <p className="fl-details__label">Elsewhere</p>
                    <div className="fl-cta__social">
                      {profile.social
                        .filter((s) => s.id !== 'email')
                        .map((s) => (
                          <a
                            key={s.id}
                            href={s.href}
                            className="fl-iconbtn"
                            aria-label={s.label}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SocialIcon id={s.id} />
                          </a>
                        ))}
                    </div>
                    <p className="fl-details__note">Follow me, it&apos;s free :D</p>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                className="fl-btn fl-btn--secondary fl-btn--sm fl-btn--block"
                onClick={copyEmail}
              >
                <Icon name={copied ? 'check' : 'copy'} />
                <span>{copied ? 'Address copied' : 'Copy email address'}</span>
              </button>
            </section>

            {profile.resumeUrl && (
              <a
                className="fl-btn fl-btn--secondary fl-btn--block"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="file-text" />
                <span>Resume</span>
              </a>
            )}
          </aside>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
