import SingleTag from './SingleTag';

type TagsProps = {
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  if (tags.length > 0) {
    return (
      <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SingleTag tag={tag} key={tag} />
        ))}
      </ul>
    );
  }
  return null;
};

export default Tags;
