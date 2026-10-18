// -----------------------------------------------------------------------------
// ResumeDownloadButton.tsx — link/button for opening the résumé PDF.
//
// Lives at the top level of /components (not under /about) because this is a
// shared UI element — the About page uses it today, but any page (Home,
// Contact, Footer) can drop it in the same way.
//
// Concepts introduced here:
//   • Optional props with default values. Both `label` and `fileName` are
//     marked optional in the type and given defaults in the destructuring,
//     so `<ResumeDownloadButton />` alone works, and any caller can override
//     one field without repeating the others.
//   • Centralising a URL-building pattern. The `import.meta.env.BASE_URL`
//     prefix used to live inline in AboutHero. Moving it here means the
//     next caller does not have to remember the pattern — they just render
//     the component.
// -----------------------------------------------------------------------------

type ResumeDownloadButtonProps = {
  // The visible link text. Defaults to a reasonable label; override if a
  // specific page needs different wording (e.g. "Grab my résumé").
  label?: string;
  // File name relative to the /public folder.
  // Exposed as a prop in case we ever host a dated copy (e.g. "resume-2026.pdf")
  // and want to link to it without editing this component.
  fileName?: string;
  // Extra classes appended to the base "btn" class — lets a caller apply
  // page-specific spacing/alignment without duplicating the component.
  className?: string;
};

export default function ResumeDownloadButton({
  label = 'View Résumé (PDF)',
  fileName = 'resume.pdf',
  className
}: ResumeDownloadButtonProps) {
  // `import.meta.env.BASE_URL` already ends with a slash, and encoding the
  // file name keeps spaces safe in the URL.
  const href = `${import.meta.env.BASE_URL}${encodeURIComponent(fileName)}`;

  // Compose the class string. A caller may pass `className="align-self-end"`
  // (for example) and we append it to the base "btn". Filtering out falsy
  // values keeps a stray trailing space out of the output when no extra
  // class is passed.
  const classes = ['btn', className].filter(Boolean).join(' ');

  return (
    // target="_blank" opens the PDF in a new tab; rel="noopener noreferrer"
    // prevents the new page from controlling this one.
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
