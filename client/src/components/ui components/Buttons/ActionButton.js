export const ActionButton = ({content = " ", func, type='button' }) => {

  return (
    <button 
      onClick={func}
      type={type}
      className="rounded-md shadow ml-3 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10">
        {content}
    </button>
  )
}
