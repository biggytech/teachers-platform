import Stack from '@mui/material/Stack';

interface ButtonsRowProps {
  style?: object;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({ children, style }) => {
  return <Stack spacing={2} direction="row" style={style}>
    {children}
  </Stack>
}

export default ButtonsRow;