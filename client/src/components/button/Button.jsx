import PropTypes from 'prop-types';

function Button({btnText, type, customClassCSS}) {
  return (
    <button type={type} className={`w-[100%] mt-7 px-4 py-4 border border-none font-montserrat text-lg leading-none rounded-full ${customClassCSS}`}>
        <p className='font-montserrat text-3xl text-white text-center w-full font-normal'>{btnText}</p>
    </button>
  );
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  type: PropTypes.string,
  customClassCSS: PropTypes.string
};

export default Button;
