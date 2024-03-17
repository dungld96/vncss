import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number, initialValue: string = '') => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    console.log('delaying', value);
    const timer = setTimeout(() => setState(value), delay);

    // clear timeout should the value change while already debouncing
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return state;
}
