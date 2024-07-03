import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#9b59b6',
  roughness: 0.5,
  metalness: 0.9,
});

function MyElement3D() {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 10);
    smallSpherePivot.children[0].getWorldPosition(
      light.current.target.position
    );
  });

  const light = useRef();

  const { scene } = useThree();

  useEffect(() => {
    scene.add(light.current.target);
    return () => {
      scene.remove(light.current.target);
    };
  }, [light.current]);

  return (
    <>
      <OrbitControls />
      <ambientLight itensity={0.1} />

      <spotLight
        ref={light}
        shadow-mapSize={[1024 * 4, 1024 * 4]}
        shadow-bias={-0.0001}
        shadow-radius={128}
        shadow-blurSamples={100}
        castShadow
        color={0xffffff}
        intensity={90}
        position={[0, 5, 0]}
        angle={THREE.MathUtils.degToRad(60)}
      />

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color='#2c3e50'
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(10).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              castShadow
              receiveShadow
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name='smallSpherePivot'>
        <mesh castShadow receiveShadow position={[3, 0.5, 0]}>
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
