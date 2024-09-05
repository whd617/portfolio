import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const SimpleMaterial = new shaderMaterial(
  {
    uColor: new THREE.Color(1, 0, 0),
  },
  ` 
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(vUv.y * uColor, 1.0);
    }
  `
);

extend({ SimpleMaterial });

function MyElement3D() {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <boxGeometry />
        <simpleMaterial uColor={'green'} />
      </mesh>
    </>
  );
}

export default MyElement3D;
