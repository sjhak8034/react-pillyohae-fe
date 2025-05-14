import React, { useEffect, useRef, useState } from "react";
import "../styles/FreshButton.css"; // Import your CSS styles
// Define prop types for the component
interface BubbleButtonProps {
  text?: string;
  href?: string;
}

export default function BubbleButton({
  text = "Hover me",
  href = "#campaign",
}: BubbleButtonProps): JSX.Element {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Define ref types
  const circlesTopLeftRef = useRef<HTMLSpanElement[]>([]);
  const circlesBottomRightRef = useRef<HTMLSpanElement[]>([]);
  const effectButtonRef = useRef<HTMLSpanElement | null>(null);

  // Clear the refs array on each render
  const clearRefs = (): void => {
    circlesTopLeftRef.current = [];
    circlesBottomRightRef.current = [];
  };

  // Add elements to the refs array with proper typing
  const addCircleTopLeftRef = (el: HTMLSpanElement | null): void => {
    if (el && !circlesTopLeftRef.current.includes(el)) {
      circlesTopLeftRef.current.push(el);
    }
  };

  const addCircleBottomRightRef = (el: HTMLSpanElement | null): void => {
    if (el && !circlesBottomRightRef.current.includes(el)) {
      circlesBottomRightRef.current.push(el);
    }
  };

  // Effect to handle the animation
  useEffect(() => {
    clearRefs();

    // Apply or remove animation classes based on hover state
    if (isHovering) {
      circlesTopLeftRef.current.forEach((circle, index) => {
        circle.classList.add(`animate-top-left-${index + 1}`);
      });

      circlesBottomRightRef.current.forEach((circle, index) => {
        circle.classList.add(`animate-bottom-right-${index + 1}`);
      });

      if (effectButtonRef.current) {
        effectButtonRef.current.classList.add("animate-button");
      }
    } else {
      circlesTopLeftRef.current.forEach((circle, index) => {
        circle.classList.remove(`animate-top-left-${index + 1}`);
      });

      circlesBottomRightRef.current.forEach((circle, index) => {
        circle.classList.remove(`animate-bottom-right-${index + 1}`);
      });

      if (effectButtonRef.current) {
        effectButtonRef.current.classList.remove("animate-button");
      }
    }
  }, [isHovering]);

  return (
    <div className="bubble-container">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="goo">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="button--bubble__container">
        <a
          href={href}
          className="button button--bubble"
          ref={buttonRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {text}
        </a>
        <div
          className={`button--bubble__effect-container ${
            isHovering ? "is-active" : ""
          }`}
        >
          <span className="circle top-left" ref={addCircleTopLeftRef}></span>
          <span className="circle top-left" ref={addCircleTopLeftRef}></span>
          <span className="circle top-left" ref={addCircleTopLeftRef}></span>

          <span className="button effect-button" ref={effectButtonRef}></span>

          <span
            className="circle bottom-right"
            ref={addCircleBottomRightRef}
          ></span>
          <span
            className="circle bottom-right"
            ref={addCircleBottomRightRef}
          ></span>
          <span
            className="circle bottom-right"
            ref={addCircleBottomRightRef}
          ></span>
        </div>
      </div>
    </div>
  );
}
