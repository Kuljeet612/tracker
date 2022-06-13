import { StyledH3 } from './styles';

type H3Props = {
  label: string
  value: number | ''
}

export const H3 = ({ label, value }: H3Props) => {
  return (
    <StyledH3>{label} {value}</StyledH3>
  )
}