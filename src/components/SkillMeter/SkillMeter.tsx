interface SkillMeterProps {
  name: string;
  /** 0–100. */
  value: number;
}

/** A labelled meter, so the level reaches screen readers and not only the bar's width. */
export const SkillMeter: React.FC<SkillMeterProps> = ({ name, value }) => {
  const level = Math.min(Math.max(Math.round(value), 0), 100);

  return (
    <li className="flex flex-col gap-2">
      <span className="text-sm font-medium text-neutral-12">{name}</span>
      <div
        role="meter"
        aria-label={name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        className="h-2 overflow-hidden rounded-full bg-neutral-4"
      >
        <div
          className="h-full rounded-full bg-accent-10"
          style={{ width: `${level}%` }}
        />
      </div>
    </li>
  );
};
