const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center h-10 bg-white">
      <p className="text-gray-700">&copy; Block Events {year}</p>
    </div>
  );
};

export default Footer;
