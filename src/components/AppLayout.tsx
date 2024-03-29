import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ROLES } from "@projectTypes/user";
import Head from "next/head";
import Header from "./Header";

interface AppLayoutProps {
  userRole: ROLES;
  title: string;
  isNarrow?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ userRole, title, children, isNarrow = true }) => {
  return <>
    <Header role={userRole} />
    <Head>
      <title>{title}</title>
    </Head>
    <Box sx={{
      width: '100%', maxWidth: isNarrow ? 1000 : 'none', alignSelf: 'center', backgroundColor: '#faf9f9', padding: '3em 2em', height: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <Typography variant="h3" component="div" gutterBottom style={{ marginBottom: '1em' }}>
        {title}
      </Typography>
      {children}
    </Box>
  </>
};

export default AppLayout;