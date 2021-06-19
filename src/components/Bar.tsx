import styled from 'styled-components';

interface BarProps {
  width: number;
  height: number;
  IsSorted: boolean;
  IsSearched: boolean;
  IsSelected: boolean;
  IsSwaped: boolean;
}

const Bar = ({ width, height, IsSorted, IsSearched, IsSelected, IsSwaped }: BarProps) => {
  let color = '#5f5f5f';
  if (IsSwaped) {
    //magenta
    color = '#D81159';
    //E54F6D
  } else if (IsSelected) {
    //yellow
    color = '#FFD166';
    //FA7921
  } else if (IsSearched) {
    //blue
    //#064789, 1C5D99, 448FA3, 68C5DB
    color = '#118AB2';
  } else if (IsSorted) {
    //green
    color = '#06D6A0';
    //379392, 1D7874, 49A078, 049A8F
  }

  return <Wrapper $width={width} $height={height} $color={color}></Wrapper>;
};

interface WrapperProps {
  $width: number;
  $height: number;
  $color: string;
}

const Wrapper = styled.div.attrs(({ $width, $height, $color }: WrapperProps) => ({
  style: {
    width: `${$width}%`,
    height: `${$height}%`,
    background: $color,
  },
}))<WrapperProps>`
  border: 0.1px solid white;
`;

export default Bar;
