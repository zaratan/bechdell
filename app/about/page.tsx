import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-2">
        This is a better UI for the
        <a href="https://bechdeltest.com" className="px-1 text-blue-600">
          Bechdel Test
        </a>
        page.
      </p>
      <p className="mt-4">
        <Link href="/" className="text-blue-600 mt-8">
          Back
        </Link>
      </p>
    </div>
  );
}
