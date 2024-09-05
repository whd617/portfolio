import { OrbitControls, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function MyElement3D() {
  const textures = useTexture({
    /* Mesh의 표면에 특정 재질로 변경하기 */
    map: './images/glass/Glass_Window_002_basecolor.jpg',
    /* 메쉬의 표면을 반짝이게 하기(매그러움 정도) */
    roughnessMap: './images/glass/Glass_Window_002_roughness.jpg',
    /* 거칠기 표현하기 */
    metalnessMap: './images/glass/Glass_Window_002_metallic.jpg',
    /* 재질에 입체감 부여하는 눈속임 */
    normalMap: './images/glass/Glass_Window_002_normal.jpg',
    /* Geometries의 정잠 좌표를 변경하여 입체감을 부여 */
    displacementMap: './images/glass/Glass_Window_002_height.png',
    /* Amvient Occlusion Map: 표면에 이미 만들어둔 그림자 */
    aoMap: './images/glass/Glass_Window_002_ambientOcclusion.jpg',
    /* 색상이 어두울수록 투명하게 색상이 밝을 수록 불투명하게 하는 기능 */
    alphaMap: './images/glass/Glass_Window_002_opacity.jpg',
  });

  // textures.map

  const mesh = useRef();

  useEffect(() => {
    // texture 배열 지정하기
    textures.map.repeat.x =
      textures.displacementMap.repeat.x =
      textures.aoMap.repeat.x =
      textures.roughnessMap.repeat.x =
      textures.metalnessMap.repeat.x =
      textures.normalMap.repeat.x =
      textures.alphaMap.repeat.x =
        4;

    // texture에 대한 수직방향으로의 wrap설정
    textures.map.wrapS =
      textures.displacementMap.wrapS =
      textures.aoMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.metalnessMap.wrapS =
      textures.normalMap.wrapS =
      textures.alphaMap.wrapS =
        THREE.MirroredRepeatWrapping;
    // wrapT는 수직 방향에 대한 지정

    textures.map.needsUpdate =
      textures.displacementMap.needsUpdate =
      textures.aoMap.needsUpdate =
      textures.roughnessMap.needsUpdate =
      textures.metalnessMap.needsUpdate =
      textures.normalMap.needsUpdate =
      textures.alphaMap.needsUpdate =
        true;

    mesh.current.geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(mesh.current.geometry.attributes.uv.array, 2)
    );
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 1, -8]} intensity={0.4} />
      <directionalLight position={[1, 2, 8]} intensity={0.4} />

      <mesh ref={mesh}>
        <cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={textures.map}
          roughnessMap={textures.roughnessMap}
          roughnessMap-colorSpace={THREE.NoColorSpace}
          metalnessMap={textures.metalnessMap}
          metalness={0.5}
          metalnessMap-colorSpace={THREE.NoColorSpace}
          normalMap={textures.normalMap}
          normalMap-colorSpace={THREE.NoColorSpace}
          normalScale={2}
          displacementMap={textures.displacementMap}
          displacementMap-colorSpace={THREE.NoColorSpace}
          displacementScale={0.2}
          displacementBias={-0.2}
          aoMap={textures.aoMap}
          alphaMap={textures.alphaMap}
          transparent
          alphaToCoverage
        />
      </mesh>
    </>
  );
}

export default MyElement3D;
