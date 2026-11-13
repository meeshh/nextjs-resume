type TagProps = {
  tag: string;
};

const SingleTag: React.FC<TagProps> = ({ tag }) => {
  return (
    <li className="rounded-full border border-accent-6 bg-accent-3 px-2.5 py-0.5 text-xs font-medium text-accent-11">
      {tag}
    </li>
  );
};

export default SingleTag;
