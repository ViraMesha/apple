import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { TModel, TSize } from "../models/three-models/model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsap, animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState<TSize>("small");
  const [model, setModel] = useState<TModel>({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const { title, color, img } = model;

  //camera control for the model view
  const cameraControlSm = useRef();
  const cameraControlLg = useRef();

  //model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    animateWithGsap("#heading", {
      opacity: 1,
      y: 0,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        {/* Section heading */}
        <h1 id="heading" className="section-heading">
          Take a close look.
        </h1>

        {/* Model container */}
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSm}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLg}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root") as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, index) => {
                  const { id, title, color, img } = model;
                  return (
                    <li
                      key={index}
                      className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                      style={{ backgroundColor: color[0] }}
                      onClick={() => setModel(model)}
                    />
                  );
                })}
              </ul>
              <button type="button" className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value as TSize)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
