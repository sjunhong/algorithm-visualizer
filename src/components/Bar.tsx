import styled from 'styled-components';
import styles from './Bar.module.css';

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
  if (IsSorted) {
    color = 'green';
  } else if (IsSwaped) {
    color = 'red';
  } else if (IsSelected) {
    color = 'yellow';
  } else if (IsSearched) {
    color = 'blue';
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
