import { FC, ReactNode, useContext, useEffect, useRef } from "react";
import { OrderContext } from "../Context/OrderContext";

interface MenuSectionProps {
  category: string;
  children: ReactNode;
}

const MenuSection: FC<MenuSectionProps> = ({ category, children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { currentSection, setCurrentSection } = useContext(OrderContext);

  useEffect(() => {
    const observerConfig = {
      rootMargin: "-50%",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target.id !== currentSection && entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerConfig);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [category, sectionRef]);

  return (
    <div
      className="mb-8 scroll-mt-20"
      id={category.toLocaleLowerCase()}
      ref={sectionRef}
    >
      <h3 className="text-xl font-bold my-4">{category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MenuSection;
