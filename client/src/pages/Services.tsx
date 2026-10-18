// -----------------------------------------------------------------------------
// Services.tsx — the /services page.
//
// Structurally almost identical to Projects.tsx: a constant array of objects
// mapped to card elements. The takeaway is that this list-of-cards pattern
// scales to almost any "gallery" page in a small site.
// -----------------------------------------------------------------------------
import serviceProgrammingImage from '../assets/service-programming.svg';
import serviceWebImage from '../assets/service-web.svg';
import serviceDatabaseImage from '../assets/project-api.svg';
import serviceAiImage from '../assets/project-dashboard.svg';

type Service = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    image: serviceProgrammingImage,
    imageAlt: 'Code brackets representing software development',
    description:
      'I can create and improve software applications using programming languages such as Java and C#. I am comfortable working with program logic, object-oriented programming, and problem-solving.'
  },
  {
    id: 'web',
    title: 'Web Development',
    image: serviceWebImage,
    imageAlt: 'Browser window representing web development',
    description:
      'I can build responsive web interfaces using HTML, JavaScript, and React. I can create clean page layouts, navigation, forms, and interactive website features.'
  },
  {
    id: 'database-development',
    title: 'Database Development',
    image: serviceDatabaseImage,
    imageAlt: 'Connected relational database entities',
    description:
      'I can design and work with relational databases using SQL and Oracle. I have experience creating tables, relationships, primary and foreign keys, normalization, and SQL queries.'
  },
  {
    id: 'ai-python-development',
    title: 'AI and Python Development',
    image: serviceAiImage,
    imageAlt: 'Data chart representing AI and prediction workflows',
    description:
      'I can build basic AI and prediction-based applications using Python. I have experience working with data preprocessing, model training, evaluation, and prediction workflows.'
  }
];

export default function Services() {
  return (
    <section>
      <h1 className="section-title">Services</h1>
      <p className="lead">Areas of software and technology I have experience with.</p>

      <div className="grid gap-5 mt-6 grid-cols-1 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="card service-card flex flex-col items-center text-center gap-1"
          >
            <img
              className="w-24 h-24 my-2"
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
            />
            <h3 className="mb-1">{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
