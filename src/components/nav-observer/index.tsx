import {
  Accessor,
  ParentComponent,
  createContext,
  createSignal,
  useContext,
  createEffect,
} from "solid-js";

type NavObserverContextType = [Accessor<string>, (ref: HTMLElement) => void];

const noop = (ref: HTMLElement) => {};

const defaultValue: NavObserverContextType = [() => "", noop];

const NavObserverContext = createContext<NavObserverContextType>(defaultValue);

let options = {
  rootMargin: "0px",
  threshold: 0.25,
};

export const NavObserverProvider: ParentComponent<{}> = (props) => {
  const [activeId, setActiveId] = createSignal<string>("");
  const [refs, setRef] = createSignal<HTMLElement[]>([]);

  const registerRef = (ref: HTMLElement) =>
    setRef((prevRefs) => [...prevRefs, ref]);

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  createEffect(() => {
    let observer = new IntersectionObserver(observerCallback, options);

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

export let useActiveSectionId = () => useContext(NavObserverContext)[0];
