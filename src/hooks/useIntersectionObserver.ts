import { useEffect, useRef, useState, useCallback } from "react";

type VisibilityCallback = (isVisible: boolean, entry: IntersectionObserverEntry) => void;
type ThresholdCallback = (intersectionRatio: number, entry: IntersectionObserverEntry) => void;

interface IntersectionObserverHookOptions extends IntersectionObserverInit {
  onVisibilityChange?: VisibilityCallback;
  onThresholdExceed?: ThresholdCallback;
}

export const useIntersectionObserver = (options?: IntersectionObserverHookOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  const { onVisibilityChange, onThresholdExceed, ...restOptions } = options || {};

  const observerOptions = useMemo(() => restOptions, [restOptions]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
      setIntersectionRatio(entry.intersectionRatio);

      if (onVisibilityChange) {
        onVisibilityChange(entry.isIntersecting, entry);
      }

      if (onThresholdExceed && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
        // Only trigger onThresholdExceed if ratio is greater than 0 or element is intersecting
        onThresholdExceed(entry.intersectionRatio, entry);
      }
    },
    [onVisibilityChange, onThresholdExceed]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observerOptions, handleIntersect]);

  return { ref, isVisible, intersectionRatio };
};
