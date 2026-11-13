// purely decorative; fixed so it stays put while the page scrolls
const Moon = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute top-4 left-4 h-96 w-96 rounded-full bg-white bg-linear-to-br from-slate-50 to-transparent"
        style={{
          boxShadow: '-16px -20px 60px 10px rgba(255, 255, 255, 0.4)',
        }}
      />
      <div className="absolute top-8 left-8 h-96 w-96 rounded-full bg-black" />
      <div className="absolute top-8 left-8 h-96 w-96 rounded-full bg-linear-to-br from-gray-100 to-transparent opacity-40" />
    </div>
  );
};

export default Moon;
