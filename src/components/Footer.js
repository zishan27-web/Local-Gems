import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-400 text-sm text-center p-6 mt-auto">
      <div className="container mx-auto">
        <p className="mb-2">
          &copy; {currentYear} Local Gems. All Rights Reserved.
        </p>
        <p>
          <span>Created by </span>
          <a 
            href="https://github.com/zishan27-web"
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium text-white hover:underline"
          >
            Zishan
          </a>
          <span> | </span>
          <a 
            href="https://github.com/zishan27-web/Local-Gems.git"
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium text-white hover:underline"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}