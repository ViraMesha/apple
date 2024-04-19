import * as THREE from "three";

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
