export default function Map() {
  return (
    <div className="w-full h-[400px] my-8">
      <iframe
        title="Business Location"
        src="https://www.google.com/maps/embed?pb=!1m18!..."
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}
