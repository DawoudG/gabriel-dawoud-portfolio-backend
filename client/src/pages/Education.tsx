// -----------------------------------------------------------------------------
// Education.tsx — the /education page.
//
// Concepts introduced here:
//   • Deriving a value inside `.map()` before returning JSX. When the callback
//     needs a local variable, use a full function body with `return (...)`
//     instead of the concise arrow form `(x) => (...)`.
//   • Ternary expression `cond ? a : b` for picking between two values inline.
//   • Semantic HTML: <ol> ("ordered list") is used because the timeline has a
//     meaningful order (most recent first). Assistive tech announces it as a
//     numbered list.
// -----------------------------------------------------------------------------

type Qualification = {
  id: string;
  program: string;
  institution: string;
  dates: string;
  status: string;
  expectedGraduation: string;
  relevantCourses: string[];
};

const QUALIFICATIONS: Qualification[] = [
  {
    id: 'centennial-college',
    program: 'Software Engineering Technology – Artificial Intelligence (Co-op)',
    institution: 'Centennial College',
    dates: '2025 – Present',
    status: 'Year 2, Semester 3',
    expectedGraduation: 'April 2028',
    relevantCourses: [
      'AI Systems Design',
      'Introduction to AI',
      'Java Programming',
      'Programming 2',
      'Introduction to Database Concepts',
      'Web Application Development'
    ]
  }
];

export default function Education() {
  return (
    <section>
      <h1 className="section-title">Education</h1>
      <p className="lead">
        My current program and relevant coursework.
      </p>

      <div className="mt-6 grid gap-4">
        {QUALIFICATIONS.map((item) => {
          return (
            <article
              key={item.id}
              className="card education-card grid gap-5 items-start grid-cols-1 sm:grid-cols-[140px_1fr]"
            >
              <div className="font-bold text-accent text-[1.05rem]">{item.dates}</div>
              <div>
                <h3 className="mb-1">{item.institution}</h3>
                <p className="text-text mb-1">{item.program}</p>
                <p className="mb-0">{item.status}</p>
                <p className="mb-0">
                  <span className="text-text font-semibold">Expected Graduation: </span>
                  {item.expectedGraduation}
                </p>
                <h4 className="mt-4 mb-2 text-text">Relevant Courses</h4>
                <ul className="list-disc pl-5 m-0 grid gap-1.5 text-text leading-relaxed sm:grid-cols-2">
                  {item.relevantCourses.map((course) => (
                    <li key={course} className="pl-1">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
