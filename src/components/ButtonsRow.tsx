import Stack from '@mui/material/Stack';

const ButtonsRow: React.FC = ({ children }) => {
  return <Stack spacing={2} direction="row">
    {children}
  </Stack>
}

export default ButtonsRow;