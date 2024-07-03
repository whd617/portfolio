import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';

function MyElement3D() {
  const model = useGLTF('./models/model.glb');
  /* 3D 모델에 anymation hook */
  const animations = useAnimations(model.animations, model.scene);
  const { actionName } = useControls({
    actionName: {
      value: animations.names[1],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[actionName];
    action.reset().fadeIn(0.5).play();
    return () => {
      /* 이전 action 객체에 대해서 fadeOut 메서드를 호출할 때 0.5초간격을 두어 서서히 이전 action이 사라지도록 설정*/
      action.fadeOut(0.5);
    };
  }, [actionName]);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    /* 객체의 높이 구하기 */
    /* Y값에 대한 최소값과 최대값을 넣기위한 변수 설정 */
    let minY = Infinity,
      maxY = -Infinity;
    /* model.scene은 여러개의 객체러 구성되어져 있다. */
    /* 구성객체를 하나씩 순회하는 traverse 메서드 호출*/
    model.scene.traverse((item) => {
      if (item.isMesh) {
        /* 객체에서 mesh일 경우 하나의 경계 상자를 구하는 변수*/
        const geomBbox = item.geometry.boundingBox;
        /* 이 경계상자의 Y축에 대한 값을 얻어온다.  */
        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });
    /* 구성 객체의 높이에 해당하는 Y축의 최대값과 최소값을 가져와서 객체의 높이를 알수 있다. */
    const h = maxY - minY;
    setHeight(h);
    console.log(h);
  }, [model.scene]);

  return (
    <>
      <OrbitControls />

      <Environment preset='sunset' />
      <primitive
        scale={5}
        position-y={-(height / 2) * 5}
        object={model.scene}
      />
    </>
  );
}

export default MyElement3D;
