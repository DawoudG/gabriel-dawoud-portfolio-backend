// -----------------------------------------------------------------------------
// Contact.tsx — the /contact page and its form.
//
// Concepts introduced here:
//   • Controlled inputs, one shared onChange handler that branches on
//     `event.target.type` for the checkbox case.
//   • Radio group in a <fieldset>/<legend> for accessibility.
//   • <select> dropdown with a disabled placeholder <option> paired with an
//     empty string in state.
//   • Custom validate() function + errors + touched state, with accessible
//     aria-invalid + aria-describedby wiring.
//   • Tailwind pattern for form inputs — we hoist the shared 8-class utility
//     string into a `FIELD_CONTROL` constant so every <input>/<textarea>/
//     <select> stays consistent without a real CSS class.
// -----------------------------------------------------------------------------
import { useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

type FieldName = keyof ContactFormValues;
type FormErrors = Partial<Record<FieldName, string>>;
type TouchedFields = Partial<Record<FieldName, boolean>>;

const EMPTY_FORM: ContactFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: ''
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'.\- ]{0,39}$/;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 500;

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (!NAME_PATTERN.test(values.firstName.trim())) {
    errors.firstName = 'Use letters, spaces, hyphens, or apostrophes only.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (!NAME_PATTERN.test(values.lastName.trim())) {
    errors.lastName = 'Use letters, spaces, hyphens, or apostrophes only.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Enter 7–20 characters — digits, spaces, +, -, ( or ).';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That doesn\'t look like a valid email address.';
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Message is required.';
  } else if (trimmedMessage.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Message must be at least ${MESSAGE_MIN_LENGTH} characters (currently ${trimmedMessage.length}).`;
  } else if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer (currently ${trimmedMessage.length}).`;
  }

  return errors;
}

// Shared utility bundles. Extracting them into module-level constants keeps
// the JSX below scannable and prevents subtle drift between fields.
//
// The `aria-invalid:` prefix is a Tailwind variant that fires when the
// element has `aria-invalid="true"`. Combined with our accessible error
// state, this gives every invalid field the red border for free.
const FIELD_LABEL = 'grid gap-1.5 text-sm text-muted';
const FIELD_CONTROL =
  'bg-surface-2 border border-border text-text rounded-md px-3.5 py-2.5 text-base font-sans focus:outline-2 focus:outline-accent focus:outline-offset-2 aria-invalid:border-danger';

export default function Contact() {
  const [formValues, setFormValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const navigate = useNavigate();

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    const { name, type } = target;
    const nextValue =
      type === 'checkbox' && target instanceof HTMLInputElement
        ? target.checked
        : target.value;

    const fieldName = name as FieldName;

    setFormValues((previousValues) => ({
      ...previousValues,
      [fieldName]: nextValue
    }));

    if (errors[fieldName]) {
      setErrors((previousErrors) => {
        const next = { ...previousErrors };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleFieldBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name as FieldName;
    setTouched((previous) => ({ ...previous, [fieldName]: true }));
    setErrors(validate(formValues));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(formValues);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const allTouched: TouchedFields = {};
      (Object.keys(EMPTY_FORM) as FieldName[]).forEach((name) => {
        allTouched[name] = true;
      });
      setTouched(allTouched);
      return;
    }

    const submittedFirstName = formValues.firstName;
    const submittedLastName = formValues.lastName;
    setFormValues(EMPTY_FORM);
    setErrors({});
    setTouched({});

    // navigate() with `state` passes data to the next page. Home.tsx reads
    // it via useLocation().state and renders the "Thanks, ___" banner.
    navigate('/', { state: { justSubmitted: true, firstName: submittedFirstName, lastName: submittedLastName } });
  };

  const errorFor = (name: FieldName): string | undefined =>
    touched[name] ? errors[name] : undefined;

  return (
    <section>
      <h1 className="section-title">Contact Me</h1>
      <p className="lead">
        Want to work together, ask a question, or just say hello? Reach out below
        and I'll get back to you within a couple of business days.
      </p>

      {/* Two-column layout above md; single column below. */}
      <div className="grid gap-5 mt-6 items-start grid-cols-1 md:grid-cols-[1fr_1.4fr]">
        <aside className="card">
          <h2 className="mt-0">Get in touch</h2>
          <dl className="m-0 grid gap-3">
            <div className="grid grid-cols-[90px_1fr] gap-2">
              <dt className="text-muted font-semibold">Name</dt>
              <dd className="m-0 text-text">Gabriel Dawoud</dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-2">
              <dt className="text-muted font-semibold">Email</dt>
              <dd className="m-0 text-text">
                <a href="mailto:dawoudgabriel@gmail.com">dawoudgabriel@gmail.com</a>
              </dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-2">
              <dt className="text-muted font-semibold">Phone</dt>
              <dd className="m-0 text-text">
                <a href="tel:9055173507">905-517-3507</a>
              </dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-2">
              <dt className="text-muted font-semibold">Location</dt>
              <dd className="m-0 text-text">Mississauga, Ontario</dd>
            </div>
          </dl>
        </aside>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card contact-form grid"
        >
          {/* Two fields side by side above md. */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <label className={FIELD_LABEL}>
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                maxLength={40}
                value={formValues.firstName}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                required
                aria-invalid={Boolean(errorFor('firstName'))}
                aria-describedby={errorFor('firstName') ? 'firstName-error' : undefined}
                className={FIELD_CONTROL}
              />
              {errorFor('firstName') && (
                <p
                  id="firstName-error"
                  role="alert"
                  className="m-0 mt-0.5 text-danger text-[0.85rem] font-medium"
                >
                  {errorFor('firstName')}
                </p>
              )}
            </label>

            <label className={FIELD_LABEL}>
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                maxLength={40}
                value={formValues.lastName}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                required
                aria-invalid={Boolean(errorFor('lastName'))}
                aria-describedby={errorFor('lastName') ? 'lastName-error' : undefined}
                className={FIELD_CONTROL}
              />
              {errorFor('lastName') && (
                <p
                  id="lastName-error"
                  role="alert"
                  className="m-0 mt-0.5 text-danger text-[0.85rem] font-medium"
                >
                  {errorFor('lastName')}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <label className={FIELD_LABEL}>
              <span>Contact Number</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="905-517-3507"
                pattern="[0-9+()\-\s]{7,20}"
                value={formValues.phone}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                required
                aria-invalid={Boolean(errorFor('phone'))}
                aria-describedby={errorFor('phone') ? 'phone-error' : undefined}
                className={FIELD_CONTROL}
              />
              {errorFor('phone') && (
                <p
                  id="phone-error"
                  role="alert"
                  className="m-0 mt-0.5 text-danger text-[0.85rem] font-medium"
                >
                  {errorFor('phone')}
                </p>
              )}
            </label>

            <label className={FIELD_LABEL}>
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formValues.email}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                required
                aria-invalid={Boolean(errorFor('email'))}
                aria-describedby={errorFor('email') ? 'email-error' : undefined}
                className={FIELD_CONTROL}
              />
              {errorFor('email') && (
                <p
                  id="email-error"
                  role="alert"
                  className="m-0 mt-0.5 text-danger text-[0.85rem] font-medium"
                >
                  {errorFor('email')}
                </p>
              )}
            </label>
          </div>

          <label className={FIELD_LABEL}>
            <span>Message</span>
            <textarea
              name="message"
              rows={5}
              minLength={MESSAGE_MIN_LENGTH}
              maxLength={MESSAGE_MAX_LENGTH}
              value={formValues.message}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              required
              aria-invalid={Boolean(errorFor('message'))}
              aria-describedby={errorFor('message') ? 'message-error' : undefined}
              className={`${FIELD_CONTROL} resize-y`}
            />
            {/* Character counter. `over-limit` styling folds inline via a
                conditional class — Tailwind has no ternary of its own,
                plain JS handles that. */}
            <p
              className={`m-0 mt-0.5 self-end text-right text-xs ${
                formValues.message.length > MESSAGE_MAX_LENGTH
                  ? 'text-danger'
                  : 'text-muted'
              }`}
            >
              {formValues.message.length}/{MESSAGE_MAX_LENGTH}
            </p>
            {errorFor('message') && (
              <p
                id="message-error"
                role="alert"
                className="m-0 mt-0.5 text-danger text-[0.85rem] font-medium"
              >
                {errorFor('message')}
              </p>
            )}
          </label>

          <button type="submit" className="btn justify-self-start">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
