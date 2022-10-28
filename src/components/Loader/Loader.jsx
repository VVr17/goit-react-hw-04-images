import PropTypes from 'prop-types';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override = {
  display: 'block',
  margin: '20px auto',
};
const color = '#013220';

export const Loader = ({ isLoading }) => (
  <PropagateLoader
    color={color}
    loading={isLoading}
    cssOverride={override}
    size={15}
    aria-label="Loading Spinner"
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
