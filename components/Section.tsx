// components/Section.tsx
interface SectionProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export function Section({ children, className = "" }: SectionProps) {
    return (
      <section className={`space-y-8 ${className}`}>
        {children}
      </section>
    );
  }