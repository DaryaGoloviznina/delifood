export const DeleteModal = ({box, deleteBox, setShowModal, deleteAll}) => {
    return (
      <div>
        <div
        className="flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-2xl relative flex w-full bg-white outline-none focus:outline-none flex items-start justify-between  border-b border-solid rounded-lg">
            <div className="w-full shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
              <div className="flex pb-3 items-center">

                <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50">
                  <img src="https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
                  onClick={() => setShowModal(false)}/>
                </div>

                <div className="-ml-1 text-gray-600 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={4} y1={7} x2={20} y2={7} />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </div>
                { deleteAll 
                ? <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pl-2">Delete all boxes?</p>
                : <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pl-2">Delete {box.name}?</p>}
              </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">Please note that this is an irreversable change.</p>
                { deleteAll 
                ? <button 
                onClick={deleteAll}
                className="focus:outline-none bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded text-white px-3 py-2 text-xs">
                  Delete All Boxes
                </button>
                : <button 
                onClick={deleteBox}
                className="focus:outline-none bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded text-white px-3 py-2 text-xs">
                  Delete Box
                </button>}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
      </div>   
    );
};
