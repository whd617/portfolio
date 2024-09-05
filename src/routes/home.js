import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import Intro from '../components/Intro-Section';

function Home() {
  const [loading, setLoading] = useState(true);

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
          {/* Intro 모달 버튼과 콘텐츠 */}
          <Intro
            closeIntroModal={closeIntroModal}
            isIntroModalOpen={isIntroModalOpen}
            openIntroModal={openIntroModal}
          />
          {/* skill 버튼과 콘텐츠 */}
        </div>
      )}
    </>
  );
}

export default Home;
