import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.spinner}>
    <ThreeDots color="#013220" ariaLabel="three-dots-loading" />
  </div>
);
