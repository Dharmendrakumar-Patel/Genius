import PropTypes from 'prop-types';

function SkeltonButtonUrl({btnText, btnIcon, customClassCSS, handleUrl}) {
    return (
        <form action={handleUrl} method="get" className='w-full md:w-[45%]'>
            <button
                className={`w-full flex justify-center items-center gap-2 mt-7 px-4 py-4 border border-black font-montserrat text-lg leading-none rounded-full btn-drop ${customClassCSS}`}
            >
                {btnIcon && <img src={btnIcon} alt="arrow right icon" className="mr-2 w-8 h-8"/>}
                <span className='leading-6'>{btnText}</span>
            </button>
        </form>
    )
}

SkeltonButtonUrl.propTypes = {
    btnText: PropTypes.string.isRequired,
    btnIcon: PropTypes.string,
    customClassCSS: PropTypes.string,
    handleUrl: PropTypes.string,
};

export default SkeltonButtonUrl