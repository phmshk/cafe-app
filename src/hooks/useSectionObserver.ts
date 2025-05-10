import { useEffect, useRef } from "react";

function useSectionObserfer(options?: IntersectionObserverInit) {
  const ref = useRef(null);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return ref;
}

export default useSectionObserfer;
