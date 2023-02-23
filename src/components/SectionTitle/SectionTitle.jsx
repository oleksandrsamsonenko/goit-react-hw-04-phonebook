import PropTypes from 'prop-types';
import css from './SectionTitle.module.css';

export const SectionTitle = ({ title, children }) => {
  return (
    <div className={css.section}>
      <h2 className="csstitle">{title}</h2>
      {children}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};
