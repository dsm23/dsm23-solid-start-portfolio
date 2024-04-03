import {
  createContext,
  createSignal,
  useContext,
  createEffect,
} from "solid-js";
import type { Accessor, ParentComponent } from "solid-js";

type NavObserverContextType = [Accessor<string>, (ref: HTMLElement) => void];

const noop = (_: HTMLElement) => {};

const defaultValue: NavObserverContextType = [() => "", noop];

const NavObserverContext = createContext<NavObserverContextType>(defaultValue);

const options = {
  rootMargin: "0px",
  threshold: 0.25,
};

export const NavObserverProvider: ParentComponent<unknown> = (props) => {
  const [activeId, setActiveId] = createSignal<string>("");
  const [refs, setRef] = createSignal<HTMLElement[]>([]);

  const registerRef = (ref: HTMLElement) =>
    setRef((prevRefs) => [...prevRefs, ref]);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  createEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);

    refs().forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  });

  return (
    <NavObserverContext.Provider value={[activeId, registerRef]}>
      {props.children}
    </NavObserverContext.Provider>
  );
};

export const registerNavObserver = (el: HTMLElement) => {
  const registerRef = useContext(NavObserverContext)?.[1] ?? noop;

  registerRef(el);
};

export const useActiveSectionId = () => useContext(NavObserverContext)[0];
