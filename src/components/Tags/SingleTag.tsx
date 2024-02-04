type TagProps = {
  tag: string;
};

const SingleTag: React.FC<TagProps> = ({ tag }) => {
  return (
    <div className="m-2 inline-block rounded-2xl bg-sky-600 px-2 py-1 text-sm">
      {tag.trim()}
    </div>
  );
};

export default SingleTag;
