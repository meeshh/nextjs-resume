import { glance } from 'src/helpers/glance';

const Fact: React.FC<{ term: string; children: React.ReactNode }> = ({
  term,
  children,
}) => (
  <div className="flex flex-col gap-0.5">
    <dt className="text-xs font-medium tracking-wider text-neutral-11 uppercase">
      {term}
    </dt>
    <dd className="text-neutral-12">{children}</dd>
  </div>
);

export const AtAGlance: React.FC = () => {
  const { current, location, years, languages } = glance;

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-neutral-6 md:grid-cols-1 md:border-l md:pl-8">
      {current && (
        <Fact term="Currently">
          {current.title}
          <span className="text-neutral-11"> at </span>
          {current.organization}
        </Fact>
      )}
      {location && <Fact term="Based in">{location}</Fact>}
      {years && <Fact term="Experience">{years}+ years</Fact>}
      {languages.length > 0 && (
        <Fact term="Languages">{languages.join(', ')}</Fact>
      )}
    </dl>
  );
};
