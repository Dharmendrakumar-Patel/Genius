import PropTypes from 'prop-types';

function SkeltonButton({btnText, btnIcon, customClassCSS, handleClick}) {
    return (
        <button
            className={`w-full flex justify-center items-center gap-2 px-4 py-4 border border-black font-montserrat text-lg leading-none rounded-full btn-drop ${customClassCSS}`}
            onClick={handleClick}
        >
            {btnIcon && <img src={btnIcon} alt="arrow right icon" className="mr-2 w-8 h-8"/>}
            <span className='leading-6'>{btnText}</span>
        </button>
    )
}

SkeltonButton.propTypes = {
    btnText: PropTypes.string.isRequired,
    btnIcon: PropTypes.string,
    customClassCSS: PropTypes.string,
    handleClick: PropTypes.func,
};

export default SkeltonButton