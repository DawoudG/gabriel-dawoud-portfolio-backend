// -----------------------------------------------------------------------------
// TechStack.tsx — a grouped list of technologies I use day-to-day.
// -----------------------------------------------------------------------------

export type TechGroup = {
  label: string;
  items: readonly string[];
};

type TechStackProps = {
  title?: string;
  groups?: readonly TechGroup[];
};

export const DEFAULT_TECH_GROUPS: readonly TechGroup[] = [
  {
    label: 'Languages',
    items: ['Java', 'C#', 'HTML']
  },
  {
    label: 'Interests',
    items: ['Artificial Intelligence', 'Software Development', 'Web Development']
  },
  {
    label: 'Other',
    items: ['Development tools']
  }
];

export default function TechStack({
  title = 'Tech stack',
  groups = DEFAULT_TECH_GROUPS
}: TechStackProps) {
  return (
    <section className="mt-8">
      <h2 className="m-0 mb-3 text-xl">{title}</h2>

      <dl className="m-0 grid gap-3">
        {groups.map((group) => (
          // Two-column row above sm (fixed label column + flexible items),
          // stacked column below.
          <div
            key={group.label}
            className="grid items-baseline gap-1.5 sm:gap-4 grid-cols-1 sm:grid-cols-[130px_1fr]"
          >
            <dt className="m-0 text-muted font-semibold text-[0.85rem] uppercase tracking-wider">
              {group.label}
            </dt>
            <dd className="m-0">
              <ul className="list-none p-0 m-0 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
