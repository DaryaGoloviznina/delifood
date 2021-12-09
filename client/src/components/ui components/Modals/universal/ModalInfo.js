
export const ModalInfo = ({info, setModalInfoState, img}) => {
  return (
    <>
    <div
        className="flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-2xl relative flex w-full bg-white outline-none focus:outline-none flex  justify-center  border-b border-solid rounded-lg">
            <div className="w-full shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
              <div className="flex pb-3 justify-center ">
                <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50">
                  <img src="https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
                  onClick={() => setModalInfoState(false)}/>
                </div>
                <div className="flex justify-center items-center text-center">
                    {img}
                </div>
              </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">{info}</p>
                <div className="flex justify-center">
                <button 
                onClick={() => setModalInfoState(false)}
                className="focus:outline-none bg-green-400 transition duration-150 ease-in-out hover:bg-green-500 rounded text-white px-3 py-2 text-xs">
                  Ok
                </button> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
