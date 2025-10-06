export default function Footer() {
  return (
  <footer className="bg-[#19A0EC] text-white mt-12 p-6 flex justify-between items-center">
    <div>
      &copy; {new Date().getFullYear()} Optimal Protect PPE
    </div>
    <div className="flex gap-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        FB
      </a>
      <a href="mailto:info@optimalprotect.com">Email</a>
      <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer">
        Maps
      </a>
    </div>
  </footer>
  );
}
