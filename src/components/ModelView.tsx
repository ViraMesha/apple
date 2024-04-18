import * as THREE from "three";
import { TModel, TSize } from "../models/three-models/model";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import Lights from "./Lights";
import { Suspense } from "react";
import IPhone from "./IPhone";
import Loader from "./Loader";

type Props = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: "view1" | "view2";
  controlRef: any;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: TModel;
  size: TSize;
};

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: Props) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full ${index === 2 && "right-[-100%]"} `}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
      >
        {/* Provide a loader until the model loads */}
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
