import { Canvas, useFrame } from '@react-three/fiber';
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import React, { useEffect, useState } from 'react';
import { DotLoader, HashLoader } from 'react-spinners';
import { Delivery } from '../renders/Delivery';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

function Sphere() {
  useFrame((state, delta) => {
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y += delta;
  });

  return (
    <group>
      <group position={[25, 165, -190]} name='smallSpherePivot'>
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          rotationY={(45 * Math.PI) / 180}
        >
          <sphereGeometry args={[3, 64, 64]} />
          <meshStandardMaterial
            color='#e74c3c'
            roughness={0.2}
            metalness={0.5}
            emissive='#ff4c3c'
            toneMapped={true}
            emissiveIntensity={20}
          />
          <pointLight color='#ff4c3c' intensity={7} />
        </mesh>
      </group>
    </group>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);

  /* HueSaturation을 사용하기위한 UI*/
  const { enabled, hue, saturation } = useControls('HueSatureation', {
    enabled: { value: true },
    hue: {
      value: 2.9,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
    saturation: {
      value: 2.2,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
  });

  /* BrightnessContrast을 사용하기위한 UI*/
  const { brightness, contrast } = useControls({
    brightness: {
      value: 0.2,
      min: -1,
      max: 1,
      step: 0.1,
    },
    constrast: {
      value: 1,
      min: -1,
      max: 1,
      step: 0.1,
    },
  });

  const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
    useControls('Bloom', {
      intensity: { value: 1.88, min: 0, max: 10, step: 0.01 },
      mipmapBlur: { value: true },
      luminanceThreshold: { value: 1, min: 0, max: 1, step: 0.01 },
      luminanceSmoothing: { value: 2, min: 0, max: 2, step: 0.01 },
    });

  useEffect(() => {
    // 페이지 로딩이 완료될 때 초기화 작업을 수행합니다.
    const handleLoad = () => {
      setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 완료되었음을 표시합니다.
    };

    // load 이벤트를 등록하여 페이지 로딩이 완료되면 handleLoad 함수를 실행합니다.
    window.addEventListener('load', handleLoad);

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {/* 로딩 중일 때 보여줄 화면 */}
      {loading && (
        <div className='flex justify-center items-center h-screen'>
          <div className='flex flex-col items-center'>
            <span className='text-xl font-bold'>잠시만 기다려주세요</span>
            <HashLoader className='mt-8' color='#008000' />
          </div>
        </div>
      )}

      {/* 로딩이 완료되면 실제 애플리케이션을 렌더링합니다. */}
      {!loading && (
        <div className='h-screen max-h-min md:h-full w-full bg-blue-600'>
          <Canvas
            shadows
            camera={{
              fov: 75,
              position: [70, -2, 170],
              near: 2,
              far: 5000,
            }}
          >
            {/* <OrbitControls /> */}
            <ambientLight color='#ffffff' intensity={10000} />
            <EffectComposer enabled={enabled}>
              {/* 색조와 채도를 변경 */}
              <HueSaturation hue={hue} saturation={saturation} />
              {/* 밝기와 contrast 조정 */}
              <BrightnessContrast brightness={brightness} contrast={contrast} />

              <Bloom
                intensity={intensity}
                mipmapBlur={mipmapBlur}
                luminanceThreshold={luminanceThreshold}
                luminanceSmoothing={luminanceSmoothing}
              />
            </EffectComposer>
            <Sphere />

            {/* 실제 3D 객체를 렌더링합니다. */}
            <Delivery scale={50} position={[-50, -260, -120]} />
          </Canvas>
        </div>
      )}
    </>
  );
}

export default Home;
