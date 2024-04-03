import { createEffect, createSignal, onMount } from "solid-js";
import type { Component, JSX } from "solid-js";

type Props = JSX.SvgSVGAttributes<SVGSVGElement>;

const Divisor: Component<Props> = (props) => {
  let animationContainer: SVGSVGElement | undefined;
  let leftCurve: SVGAnimateElement | undefined;
  let rightCurve: SVGAnimateElement | undefined;
  let leftBall: SVGAnimateMotionElement | undefined;
  let rightBall: SVGAnimateMotionElement | undefined;

  const [autoplay, setAutoplay] = createSignal<boolean>(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setAutoplay(true);
      }
    });
  };

  onMount(() => {
    const observerOptions = {
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    if (animationContainer instanceof SVGSVGElement) {
      observer.observe(animationContainer);
    }

    return () => {
      observer.disconnect();
    };
  });

  createEffect(() => {
    if (autoplay()) {
      leftCurve!.beginElement();
      rightCurve!.beginElement();
      leftBall!.beginElement();
      rightBall!.beginElement();
    }
  });

  return (
    <svg
      {...props}
      ref={animationContainer}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 260 50"
      class="w-full text-sky-200 print:hidden lg:px-28"
      stroke="currentColor"
    >
      <path
        stroke-dasharray="134"
        stroke-dashoffset={-134}
        d="
        M10,25
        C30,40
        30,10
        50,25
        70,40
        70,10
        90,25
        110,40
        110,10
        130,25
        "
      >
        <animate
          ref={leftCurve}
          attributeName="stroke-dashoffset"
          to="0"
          dur="2500ms"
          fill="freeze"
          begin="indefinite"
        />
      </path>
      <path
        stroke-dasharray="134"
        stroke-dashoffset={134}
        d="
        M130,25
        C150,40
        150,10
        170,25
        190,40
        190,10
        210,25
        230,40
        230,10
        250,25
    "
      >
        <animate
          ref={rightCurve}
          attributeName="stroke-dashoffset"
          to="0"
          dur="2500ms"
          fill="freeze"
          begin="indefinite"
        />
      </path>
      <circle
        cx="10"
        cy="25"
        r="4"
        fill="currentColor"
        class="text-blue-300"
        visibility={!autoplay() ? "hidden" : "visible"}
      >
        <animateMotion
          ref={leftBall}
          dur="2500ms"
          repeatCount={1}
          begin="indefinite"
          path="M120,0 C100,-15
            100,15
            80,0
            60,-15
            60,15
            40,0
            20,-15
            20,15
            0,0"
        />
      </circle>
      <circle
        cx="250"
        cy="25"
        r="4"
        fill="currentColor"
        class="text-sky-500"
        visibility={!autoplay() ? "hidden" : "visible"}
      >
        <animateMotion
          ref={rightBall}
          dur="2500ms"
          repeatCount={1}
          begin="indefinite"
          path="M-120,0 C-100,15
          -100,-15
          -80,0
          -60,15
          -60,-15
          -40,0
          -20,15
          -20,-15
          0,0"
        />
      </circle>
    </svg>
  );
};

export default Divisor;
