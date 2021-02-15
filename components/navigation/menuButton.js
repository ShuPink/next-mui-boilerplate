import PropTypes from 'prop-types';
import { useState } from 'react';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BiThreeDotsVertical } from 'components/svgs';
import s from './navigation.module.scss';

function MenuButton({ applyAnchor }) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(s.list, {
        [s.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? '(i)' : '(m)'}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? '(i)' : '(m)'}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Button
        id="hamburger"
        classes={{ root: s.hamburger }}
        onClick={toggleDrawer(applyAnchor, true)}
        aria-label="site menu"
      >
        {applyAnchor === 'left' ? <BiThreeDotsVertical /> : 'MENU'}
      </Button>
      <SwipeableDrawer
        anchor={applyAnchor}
        open={state[applyAnchor]}
        onClose={toggleDrawer(applyAnchor, false)}
        classes={{
          paper: clsx(s.drawer),
        }}
      >
        {list(applyAnchor)}
      </SwipeableDrawer>
    </>
  );
}

export default MenuButton;

MenuButton.propTypes = {
  applyAnchor: PropTypes.string,
};

MenuButton.defaultProps = {
  applyAnchor: 'bottom',
};
