import styled from 'styled-components';

function ColorCaption(): JSX.Element {
  const colorCaptions = [
    {
      color: '#06D6A0',
      caption: 'SORTED',
    },
    {
      color: '#D81159',
      caption: 'SWAPING',
    },
    {
      color: '#FFD166',
      caption: 'SELECTED',
    },
    {
      color: '#118AB2',
      caption: 'SEARCHING',
    },
  ];
  return (
    <Wrapper>
      {colorCaptions.map((colorCaption) => (
        <CaptionWrapper key={colorCaption.color}>
          <ColorBox color={colorCaption.color}></ColorBox>
          {colorCaption.caption}
        </CaptionWrapper>
      ))}
    </Wrapper>
  );
}

const ColorBox = styled.div<{ color: string }>`
  width: 4vw;
  height: 3vh;
  margin: 0 1vw 0 0;
  background: ${(p) => p.color};
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const CaptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5vw;
  font-size: 1.5vw;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  align-items: start;
  padding: 1vw 2vw 0 4vw;
  width: 50vw;
`;

export default ColorCaption;
