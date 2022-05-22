import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface InfoListItem {
  label: string;
  value?: string;
  id: string;
}

interface InfoListProps {
  items: InfoListItem[];
}

const InfoList: React.FC<InfoListProps> = ({ items }) => {
  return <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '2em' }}>
    {items.map((item, i) => {
      return (<React.Fragment key={item.id}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={item.label}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.value}
                </Typography>
              </>
            }
          />
        </ListItem>
        {i !== items.length - 1 ? <Divider variant="inset" component="li" style={{ marginLeft: 0 }} /> : null}
      </React.Fragment>)
    })}


  </List>
}

export default InfoList;