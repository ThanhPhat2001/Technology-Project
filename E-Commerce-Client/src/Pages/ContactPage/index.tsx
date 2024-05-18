import React, { useState } from 'react';
import { Button, Drawer} from '@mui/material';

const ContactPage = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
       <ul>
        <li>ád</li>
        <li>zxczxc</li>
        <li>zxczxc</li>
        <li>zxcxc</li>
       </ul>
      </Drawer>
    </div>
  );
};

export default ContactPage;