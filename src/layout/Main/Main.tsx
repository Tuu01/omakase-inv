import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/o1.1.jpg';

const Main = () => {
  const { greeting } = data;
  return (
    <div>
      <ArchCard>
        <img src={mainImg} alt="Omakase hero" />
      </ArchCard>

      <MainTitle>{greeting.title}</MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
    </div>
  );
};

export default Main;

/* --- Styles --- */
const ArchCard = styled.div`
  /* sizing */
  width: 90%;
  max-width: 520px;
  aspect-ratio: 3 / 4;              /* keep a calm poster ratio */
  margin: 20px auto 0;

  /* arch & clipping */
  border-radius: 999px 999px 16px 16px;  /* arch top */
  overflow: hidden;
  background: #faf7f5;                   /* paper tone behind image */

  /* depth */
  box-shadow: 0 10px 28px rgba(47, 43, 38, 0.18);

  /* gold outer stroke */
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid #c5a46d;          /* gold */
    pointer-events: none;
  }

  /* subtle inner bevel (optional, like your mock) */
  &::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: inherit;
    border: 2px solid #ffffff;
    opacity: 0.9;
    pointer-events: none;
  }

  /* image fits without distortion */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;                   /* fills the card */
    object-position: 50% 45%;            /* tweak focal point if needed */
    display: block;
  }
`;

const MainTitle = styled.p`
  font-family: HSSanTokki20-Regular, serif;
  font-size: 2rem;
  color: #2f2120;
  line-height: 120%;
  white-space: pre-line;
  margin-top: 18px;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #5a524b;
  line-height: 140%;
  letter-spacing: 0.2px;
  white-space: pre-line;
`;