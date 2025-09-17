import { useEffect, useRef, useState, useCallback } from 'react';
import { Heading1 } from '@/components/Text.tsx';
import Wrapper from '@/components/Wrapper.tsx';
//import Account from '@/layout/Account/Account.tsx';
import Container from '@/layout/Container.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';
import GalleryWrap from '@/layout/Gallery/GalleryWrap.tsx';
//import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
import Location from '@/layout/Location/Location.tsx';
import Main from '@/layout/Main/Main.tsx';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const checkScrollPosition = useCallback(() => {
    if (galleryRef.current) {
      const { offsetTop } = galleryRef.current;
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition >= offsetTop);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition(); // initialize on mount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition as EventListener);
    };
  }, [checkScrollPosition]);

  return (
    <Container>
      <Wrapper>
        <Main />
      </Wrapper>

      <Wrapper>
        <Heading1>Invitation</Heading1>
        <Invitation />
      </Wrapper>

      <Wrapper ref={galleryRef}>
        <Heading1>Gallery</Heading1>
        <GalleryWrap />
      </Wrapper>

      {/* <Wrapper>
        <Heading1>Reservations & Gifts</Heading1>
        <Account />
      </Wrapper> */}

      <Wrapper>
        <Heading1>Location</Heading1>
        <Location />
      </Wrapper>

      {/* <Wrapper>
        <Heading1>Messages to the Hosts</Heading1>
        <Guestbook />
      </Wrapper> */}

      <FloatingBar isVisible={isVisible} />
    </Container>
  );
}

export default App;