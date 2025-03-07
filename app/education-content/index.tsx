// pages/education-content/index.tsx
import Link from 'next/link';

const EducationContent = () => {
  return (
    <div>
      <h1>Education Content</h1>
      <nav>
        <ul>
          <li><Link href="/education-content/case-studies">Case Studies</Link></li>
          <li><Link href="/education-content/training">Staff Training</Link></li>
          <li><Link href="/education-content/wellness">Health & Wellness</Link></li>
          <li><Link href="/education-content/news">Latest News</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default EducationContent;
