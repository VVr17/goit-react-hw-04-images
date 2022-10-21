// import { ButtonStyled } from './Button.styled';
import css from './Button.module.css';

export const Button = ({ children }) => (
  <button className={css.button}>{children}</button>
);

Button.propTypes = {};
