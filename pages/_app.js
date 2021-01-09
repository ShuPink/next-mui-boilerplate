/* https://nextjs.org/docs/advanced-features/custom-app
Next.js uses the App component to initialize pages.
You can override it and control the page initialization. Which allows you to do amazing things like:

    Persisting layout between page changes
    Keeping state when navigating pages
    Custom error handling using componentDidCatch
    Inject additional data into pages
    Add global CSS
*/

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import useUnregisterSW from "lib/unregisterSW";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import up from 'components/up.module.scss';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  // useUnregisterSW(); // remove the sw, until we turn it back on
  const router = useRouter();
  useEffect(() => {
    /* https://material-ui.com/guides/server-rendering/#the-client-side
      Need to do this to get MUI working.
      Below code removes the server-side injected css
      and also possibly modules.scss */
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <title>Gallery</title>
      <StylesProvider injectFirst>
        {/* https://material-ui.com/components/css-baseline/ */}
        <CssBaseline />
        <TransitionGroup>
          <CSSTransition
            key={router.asPath}
            classNames={{ ...up }}
            enter
            exit
            timeout={1500}
            unmountOnExit
          >
            <Component {...pageProps} />
          </CSSTransition>
        </TransitionGroup>
      </StylesProvider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
