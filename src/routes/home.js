import { Canvas, useFrame } from '@react-three/fiber';

import { useControls } from 'leva';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import CustomModal from '../components/Modal';
import meImage from '../styles/images/me.jpg';
import nestjsImage from '../styles/images/NestJS.png';
import reactjsImage from '../styles/images/Reactjs.png';
import typescriptImage from '../styles/images/TypeScript.png';
import mongodbImage from '../styles/images/mongodb.png';
import mysqlImage from '../styles/images/mysql.png';
import nodejsImage from '../styles/images/nodejs.png';
import postgresqlImage from '../styles/images/postgresql.png';

import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from '@react-three/postprocessing';
import { Delivery } from '../renders/Delivery';

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

  useEffect(() => {
    // 페이지 로딩이 완료될 때 초기화 작업을 수행합니다.
    const handleLoad = () => {
      setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 완료되었음을 표시합니다.
    };

    // load 이벤트를 등록하여 페이지 로딩이 완료되면 handleLoad 함수를 실행합니다.
    window.addEventListener('DOMContentLoaded', handleLoad);

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, []);

  /* Intro Modal */
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  const openIntroModal = () => setIsIntroModalOpen(true);
  const closeIntroModal = () => setIsIntroModalOpen(false);

  /* Intro Modal */
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const openSkillModal = () => setIsSkillModalOpen(true);
  const closeSkillModal = () => setIsSkillModalOpen(false);

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
        <div className='relative '>
          <div className='h-screen max-h-min md:h-full w-full bg-blue-400 relative '>
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

              <spotLight position={[100, 100, 100]} angle={0.3} penumbra={1} />

              <EffectComposer enableNormalPass enabled={true}>
                <Bloom
                  intensity={1.88}
                  luminanceThreshold={1}
                  luminanceSmoothing={2}
                  height={300}
                  mipmapBlur
                />
              </EffectComposer>

              <Sphere />

              {/* 실제 3D 객체를 렌더링합니다. */}
              <Delivery scale={50} position={[-50, -260, -120]} />
            </Canvas>
          </div>
          {/* Intro 모달 버튼과 콘텐츠 */}
          <div className='h-14 w-64 md:w-80 mx-auto absolute inset-0 m-auto transform -translate-x-20 -translate-y-96  p-3 z-10'>
            <div className='max-w-xs mx-auto border-none'>
              <span
                className='inline-block px-2 py-2 text-blue-700 font-semibold rounded-lg shadow-2xl cursor-pointer transition duration-300 text-xl md:text-4xl'
                onClick={openIntroModal}
              >
                Who Are You?
              </span>
              <CustomModal
                isOpen={isIntroModalOpen}
                closeModal={closeIntroModal}
              >
                <Box sx={{ border: 'none' }}>
                  <div>
                    <div className='bg-blue-100 py-2 flex items-center w-full  h-full'>
                      <span className='text-2xl font-bold ml-5 md:text-5xl'>
                        Intro
                      </span>
                    </div>
                    <div className='flex items-center p-6'>
                      <img
                        src={meImage}
                        alt='Me'
                        className='w-48 h-auto mr-4 md:w-96'
                      />

                      <div className='flex flex-col md:text-center  w-full justify-center h-full'>
                        <div className=' flex flex-col '>
                          <span className='break-words md:text-4xl md:text-center '>
                            고객의 가치가 서비스의 가치
                          </span>
                          <span className='break-words mb-5 md:text-lg'></span>
                        </div>
                        <div className='text-xs md:text-2xl '>
                          <ul>
                            <li className='pb-1'>
                              <a href='https://wlrma-123.tistory.com/'>
                                Blog: https://wlrma-123.tistory.com/
                              </a>
                            </li>
                            <li className='pb-1'>
                              <a href='https://github.com/whd617'>
                                Github: https://github.com/whd617
                              </a>
                            </li>
                            <li>
                              <a>Email: whd617@naver.com</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </CustomModal>
            </div>
          </div>
          {/* skill 버튼과 콘텐츠 */}
          <div className='h-14 w-52 md:w-80 mx-auto absolute inset-0 m-auto transform translate-y-44 translate-x-32  p-3 z-10'>
            <div className='max-w-xs mx-auto border-none'>
              <span
                className='inline-block text-center px-2 py-2 text-blue-700 font-semibold rounded-lg shadow-2xl cursor-pointer transition duration-300 text-xl md:text-4xl'
                onClick={openSkillModal}
              >
                What skills do you have?
              </span>
              <CustomModal
                isOpen={isSkillModalOpen}
                closeModal={closeSkillModal}
              >
                <Box sx={{ border: 'none' }}>
                  <div>
                    <div className='bg-blue-100 py-2 flex items-center w-full  h-full'>
                      <span className='text-2xl font-bold ml-5 md:text-5xl'>
                        Skill
                      </span>
                    </div>
                    <div className='flex flex-col items-center p-6'>
                      <div className='flex flex-col  w-full justify-center h-full'>
                        <span className=' break-words mb-5 font-semibold text-xl'>
                          프론트엔드
                        </span>
                        <div className=' flex flex-col '>
                          <div className='flex flex-col items-center w-20'>
                            <img
                              src={reactjsImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold text-lg'>
                              ReactJS
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col  w-full justify-center h-full'>
                        <span className=' break-words mb-5 font-semibold mt-5 text-xl'>
                          백엔드
                        </span>
                        <div className=' flex flex-wrap'>
                          <div className='flex flex-col justify-end items-center  w-20'>
                            <img
                              src={nodejsImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold text-lg'>
                              NodeJS
                            </span>
                          </div>

                          <div className='flex flex-col items-center justify-end ml-8 w-20'>
                            <img
                              src={typescriptImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold  text-lg'>
                              TypeScript
                            </span>
                          </div>

                          <div className='flex flex-col items-center ml-8 justify-end w-20'>
                            <img
                              src={nestjsImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold text-lg'>
                              NestJS
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col  w-full justify-center h-full'>
                        <span className=' break-words mb-5 font-semibold mt-5 text-2xl'>
                          데이터베이스
                        </span>
                        <div className=' flex flex-wrap'>
                          <div className='flex flex-col justify-end items-center  w-20'>
                            <img
                              src={mongodbImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold text-lg'>
                              MongoDB
                            </span>
                          </div>

                          <div className='flex flex-col items-center justify-end ml-8 w-20'>
                            <img
                              src={mysqlImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold  text-lg'>
                              MySQL
                            </span>
                          </div>

                          <div className='flex flex-col items-center ml-8 justify-end w-20'>
                            <img
                              src={postgresqlImage}
                              alt='React'
                              className='w-48 h-auto'
                            />
                            <span className='mt-2 break-words mb-5 font-semibold text-lg'>
                              PostgreSQL
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col  w-full justify-center h-full'>
                        <span className=' break-words mb-5 font-semibold mt-5 text-2xl'>
                          프로젝트
                        </span>
                        <ul>
                          <li className='pb-1'>
                            <h1 className='mt-2 break-words font-semibold text-lg'>
                              레스토랑서비스:
                            </h1>
                            <a
                              className='mt-2 break-words mb-5  text-lg'
                              href='https://splendorous-florentine-db3f35.netlify.app/'
                            >
                              https://splendorous-florentine-db3f35.netlify.app/
                            </a>
                          </li>
                          <li className='pb-1'>
                            <h1 className='mt-2 break-words font-semibold text-lg'>
                              영화추천서비스:
                            </h1>
                            <a
                              className='mt-2 break-words mb-5  text-lg'
                              href='https://whd617.github.io/react-for-beginners/'
                            >
                              https://whd617.github.io/react-for-beginners/
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Box>
              </CustomModal>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
