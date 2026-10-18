// -----------------------------------------------------------------------------
// AboutHero.tsx — the headshot + intro block at the top of /about.
// -----------------------------------------------------------------------------
import headshotImage from '../../assets/headshot.svg';
import ResumeDownloadButton from '../ResumeDownloadButton';

export default function AboutHero() {
  return (
    // Two columns above md (fixed 280px headshot + fluid text); single column
    // below md, with the headshot cap-widthed so it doesn't fill the screen.
    <div className="about-hero grid gap-8 items-center grid-cols-1 md:grid-cols-[280px_1fr]">
      <img
        src={headshotImage}
        alt="Placeholder for Gabriel Dawoud's head-and-shoulders photo"
        width={280}
        height={280}
        className="about-portrait w-full max-w-[280px] h-auto md:w-[280px] md:h-[280px] object-cover rounded-lg bg-surface-2 border shadow-md"
      />

      <div className="grid gap-3">
        <h2 className="mb-0">Gabriel Dawoud</h2>
        <p className="text-accent font-medium m-0">
          Software Engineering Technology – Artificial Intelligence Student
        </p>

        <p className="m-0 leading-relaxed">
          My name is Gabriel Dawoud, and I am a second-year Software Engineering
          Technology – Artificial Intelligence student at Centennial College. I am
          currently in Semester 3 and have a strong interest in artificial
          intelligence, software development, and web development. I have experience
          working with programming languages and technologies such as Java, C#, HTML,
          and other development tools. I am also a strong team player, good at
          multitasking, and enjoy solving problems and learning new technologies.
        </p>

        {/* `justify-self-start` on the button wrapper keeps it from
            stretching to fill the grid cell. */}
        <div className="justify-self-start mt-2">
          <ResumeDownloadButton />
        </div>
      </div>
    </div>
  );
}
