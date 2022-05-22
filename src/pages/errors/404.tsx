import { ErrorPage } from '@components/pages';

interface Page404Props {

};

const Page404: React.FC<Page404Props> = ({ }) => {
  return <>
    <ErrorPage code={404} text="Страница не найдена" />
  </>
};

const getServerSideProps = () => ({ props: {} });

export { getServerSideProps };
export default Page404;