import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from "next/link";

interface ErrorPageProps {
  code: number;
  text: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, text }) => {
  return <Box sx={{ width: '100%', maxWidth: 1000, margin: '2em' }}>
    <Typography variant="h2" component="div" gutterBottom>
      Упс! Возникла ошибка...
    </Typography>
    <Typography variant="subtitle2" gutterBottom component="div">
      Код ошибки: {code}
    </Typography>
    <Typography variant="caption" display="block" gutterBottom>
      {text}
    </Typography>
    <Link href="/">
      <Typography variant="button" display="block" gutterBottom style={{ cursor: 'pointer', marginTop: '3em' }}>
        Назад на главную
      </Typography>
    </Link>
  </Box>
};

export default ErrorPage;