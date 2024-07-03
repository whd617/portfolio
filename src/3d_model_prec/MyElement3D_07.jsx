import { Environment, OrbitControls, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';

const toruseGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#9b59b6',
  metalness: 0.9,
});

function MyElement3D() {
  // 애니메이션 적용하기
  useFrame((state) => {
    // 프레임이 만들어진 이후 경과된 시간 얻어오기(증가하는 값)
    const time = state.clock.elapsedTime;
    // mesh 이름으로 해당 mesh를 불러오기
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    // mesh 이름으로 불러온 것을 y축으로 회전시키기
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  return (
    <>
      <OrbitControls />

      <Environment
        blur={0.1}
        background
        files={'./images/cobblestone_street_night_4k.hdr'}
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
    </>
  );
}

export default MyElement3D;
