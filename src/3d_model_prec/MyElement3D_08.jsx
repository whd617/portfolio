import { Environment, OrbitControls, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three';
import {
  RectAreaLightHelper,
  RectAreaLightUniformsLib,
} from 'three/examples/jsm/Addons.js';

const toruseGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#9b59b6',
  metalness: 0.9,
});

RectAreaLightUniformsLib.init();

function MyElement3D() {
  // 애니메이션 적용하기
  useFrame((state) => {
    // 프레임이 만들어진 이후 경과된 시간 얻어오기(증가하는 값)
    const time = state.clock.elapsedTime;
    // mesh 이름으로 해당 mesh를 불러오기
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    // mesh 이름으로 불러온 것을 y축으로 회전시키기
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

    const target = new THREE.Vector3();
    smallSpherePivot.children[0].getWorldPosition(target);
    state.camera.position.copy(target);

    const ghostSpherePivot = state.scene.getObjectByName('ghostSpherePivot');
    ghostSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
    ghostSpherePivot.children[0].getWorldPosition(target);
    state.camera.lookAt(target);
  });

  const light = useRef();
  useHelper(light, RectAreaLightHelper);

  /* 카메라 위치조정을 위한 카메라 객체 가져오기 */
  const { camera } = useThree();
  /* useControls를 활용한 카메라 위치조정*/
  /*  useControls({
    positionZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: (v) => (camera.position.z = v),
    },
    targetZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: (v) => camera.lookAt(0, 0, v),
    },
  }); */

  return (
    <>
      {/* <OrbitControls /> */}

      <rectAreaLight
        ref={light}
        color='#ffffff'
        intensity={20}
        width={1}
        height={3}
        position={[0, 5, 0]}
        rotation-x={THREE.MathUtils.degToRad(-90)}
      />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color='#2c3e50'
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(8).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              geometry={toruseGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}
      <group name='smallSpherePivot'>
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color='#e74c3c'
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>

      {/* 구가 움직이므로 이에 대한 카메라 구도 추가 */}
      <group name='ghostSpherePivot'>
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
}

export default MyElement3D;
