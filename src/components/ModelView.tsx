import * as THREE from "three";
import { TModel, TSize } from "../models/three-models/model";

type Props = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: "view1" | "view2";
  controlRef: React.MutableRefObject<undefined>; //TODO: Replace undefined
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: TModel;
  size: TSize;
};

const ModelView = ({}: Props) => {
  return <div>ModelView</div>;
};

export default ModelView;
