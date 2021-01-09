import Link from 'next/link';
import PropTypes from 'prop-types';
import s from './id.module.scss';

export default function Id({ id }) {
  return (
    <div className={`${s.container} ${id === '1' ? s.p1 : s.p2}`}>
      <main>
        <h1 className={s.title}>
          Page
          {' '}
          {id}
        </h1>
      </main>
      <Link href="/" passHref>
        <a>Home</a>
      </Link>
      <Link href="/page/1" passHref>
        <a>Page one</a>
      </Link>
      <Link href="/page/2" passHref>
        <a>Page two</a>
      </Link>
    </div>
  );
}

Id.propTypes = {
  id: PropTypes.string.isRequired,
};

export async function getStaticProps({ params }) {
  return {
    props: { id: params.id },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const paths = ['1', '2'].map((p) => ({ params: { id: p } }));

  return {
    paths,
    fallback: false,
  };
}
