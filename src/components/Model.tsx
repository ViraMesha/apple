import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { TSize } from "../models/three-models/model";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const Model = () => {
  const [size, setSize] = useState<TSize>("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  //camera control for the model view
  const cameraControlSm = useRef();
  const cameraControlLg = useRef();

  //model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("#heading", {
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
        </div>
      </div>
    </section>
  );
};

export default Model;
