import SingleTag from './SingleTag';

type TagsProps = {
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  if (tags.length > 0) {
    return (
      <div className="mt-4">
        {tags.map((tag, index) => (
          <SingleTag tag={tag} key={index} />
        ))}
      </div>
    );
  }
  return null;
};

export default Tags;
