import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useContainerDimensions } from 'lib/containerDimensions';
import Button from '@material-ui/core/Button';
import MenuButton from './menuButton';
import s from './navigation.module.scss';

function Navigation() {
  // get window and frame dimensions
  const { windowIsPortrait } = useContainerDimensions();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const landscapeSm = smDown && !windowIsPortrait;
  return (
    <nav className={s.nav}>
      <MenuButton applyAnchor={landscapeSm ? 'left' : 'top'} />
      <Link href="/page/1" passHref>
        <Button classes={{ root: s.hideWhenSmall }}>Page 1</Button>
      </Link>
      <Link href="/page/2" passHref>
        <Button classes={{ root: s.hideWhenSmall }}>Page 2</Button>
      </Link>
    </nav>
  );
}

export default Navigation;
