import gsap from "gsap";
import * as THREE from "three";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotaionRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotaionState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: {
    transform: string;
    duration: number;
  }
) => {
  timeline.to(rotaionRef.current.rotation, {
    y: rotaionState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(firstTarget, { ...animationProps, ease: "power2.inOut" }, "<");

  timeline.to(secondTarget, { ...animationProps, ease: "power2.inOut" }, "<");
};

export const animateWithGsap = (
  target: string,
  animationProps: any,
  scrollProps?: any
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};
