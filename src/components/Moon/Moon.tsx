const Moon = () => {
  return (
    <>
      <div
        className="absolute inset-0 left-4 top-4 -z-10 h-96 w-96 rounded-full bg-white bg-gradient-to-br from-slate-50 to-transparent"
        style={{
          boxShadow: '-16px -20px 60px 10px rgba(255, 255, 255, 0.4)',
        }}
      />
      <div className="absolute left-8 right-8 top-8 -z-10 h-96 w-96 rounded-full bg-black" />
      <div className="absolute inset-0 left-8 right-8 top-8 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-gray-100 to-transparent opacity-40" />
    </>
  );
};

export default Moon;
