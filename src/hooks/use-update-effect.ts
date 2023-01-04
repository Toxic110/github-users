import { useEffect, useRef } from 'react';

/**
 * Пользовательский хук useEffect, который срабатывает только при обновлении, а не при первоначальном монтировании.
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export const useUpdateEffect = <T>(effect: () => void, dependencies: T[] = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};
