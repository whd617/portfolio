import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useControls } from 'leva';
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
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  /* HueSaturation을 사용하기위한 UI*/
  /* const { enabled, hue, saturation } = useControls('HueSatureation', {
    enabled: { value: true },
    hue: {
      value: 0,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
    saturation: {
      value: 0,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
  }); */

  /* BrightnessContrast을 사용하기위한 UI*/
  /* const { brightness, contrast } = useControls({
    brightness: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.1,
    },
    constrast: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.1,
    },
  }); */

  /* DotScreen을 사용하기 위한 UI */
  /* const { angle, scale } = useControls('dotScreen', {
    angle: { value: 1.57, min: 0, max: Math.PI * 2, step: 0.1 },
    scale: { value: 1.57, min: 0, max: 10, step: 0.1 },
  }); */

  const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
    useControls('Bloom', {
      intensity: { value: 1, min: 0, max: 10, step: 0.01 },
      mipmapBlur: { value: false },
      luminanceThreshold: { value: 0.9, min: 0, max: 1, step: 0.01 },
      luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
    });

  return (
    <>
      <OrbitControls />

      <EffectComposer /* enabled={enabled} */>
        {/* 색조와 채도를 변경 */}
        {/* <HueSaturation hue={hue} saturation={saturation} /> */}
        {/* 밝기와 constrast 조정 */}
        {/* <BrightnessContrast brightness={brightness} contrast={contrast} /> */}

        {/* Dot 3D 효과 연출하기 */}
        {/* <DotScreen angle={angle} scale={scale} /> */}

        {/* 특정 객체를 빛나게하는 효과 */}
        <Bloom
          intensity={intensity}
          mipmapBlur={mipmapBlur}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
        />
      </EffectComposer>

      <ambientLight intensity={0.1} />

      <directionalLight
        castShadow
        color={0xffffff}
        intensity={1.2}
        position={[-3, 3, 3]}
        shadow-mapSize={[1024 * 2, 1024 * 2]}
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

      <mesh castShadow receiveShadow position-y={0.6} rotation-x={-Math.PI / 2}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.6} />
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
            emissive='#ff4c3c'
            toneMapped={false}
            emissiveIntensity={20}
          />
          {/* bloom효과가 적용된 mesh가 광원의 효과를 수행하기 위한 광원 추가*/}
          <pointLight color='#ff4c3c' intensity={7} />
        </mesh>
      </group>
    </>
  );
}

export default MyElement3D;
