import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'


export const ModalInfo = ({info, modalInfoState, setModalInfoState}) => {
  return (
    <Transition.Root show={modalInfoState} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setModalInfoState}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:text-left">
                  
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">

                      Внимание!
                      <button type="button" onClick={() => setModalInfoState(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
                    </Dialog.Title>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-8 flex flex-col">
              {info}
              
              <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mr-4 sm:w-16 sm:text-sm"
                  onClick={() => setModalInfoState(false)}
                >
                  Ok
                </button>
              </div>
              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
