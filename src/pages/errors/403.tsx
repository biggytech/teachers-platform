import { ErrorPage } from '@components/pages';

interface Page403Props {

};

const Page403: React.FC<Page403Props> = ({ }) => {
  return <>
    <ErrorPage code={403} text="Вы пытаетесь зайти на страницу, которая вам недоступна" />
  </>
};

const getServerSideProps = () => ({ props: {} });

export { getServerSideProps };
export default Page403;