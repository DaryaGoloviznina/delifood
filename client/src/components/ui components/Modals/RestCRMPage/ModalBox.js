import { useContext } from 'react'
import Context from '../../../../context'

export const ModalBox = () => {
    const { modalState, SetModalState, modalInfo, inputValues } = useContext(Context);

  return (
    <>
    <div
      className="flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-2xl relative flex w-full bg-white outline-none focus:outline-none flex items-start justify-between  border-b border-solid border-white rounded-lg">

    <div className="flex  bg-white flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <div className="bg-white flex flex-col md:flex-row rounded-3xl">
        <div 
        onClick={() => SetModalState(false)}
        className="bg-white justify-items-end top-0 right-0 cursor-pointer mt-4 ml-4 text-black text-sm z-50">
          <img 
          src="https://img.icons8.com/ios/25/000000/delete-sign--v1.png"
          />
        </div>
        <div className="mr-3 bg-white flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form 
          onSubmit={modalInfo.func}
          className="w-full">
            {modalInfo.title === 'Edit box'
              ? <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
              Edit Your Mystery Box
              </h1>
              : <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
              Create Your Mystery Box
              </h1>
            }
            <p className="mb-4 text-sm text-center text-gray-500">
              Craft your own Mystery Box right here!
            </p>
            <div className="mt-4">
              <label className="block text-sm">
                Name
              </label>
              <input 
              type='text'
              name='name'
              placeholder='Name'
              required
              defaultValue={inputValues?.name}
              className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4 flex justify-start">
              <div>
                <label className=" text-sm">
                  Amount
                </label>
                <input 
                name="count"
                type="number"
                min="0"
                placeholder={'Amount'}
                defaultValue={inputValues?.count}
                required
                className="w-32 text-sm border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              <div>
                <label className=" text-sm">
                  Price
                </label>
                <input 
                name="price"
                type="number"
                min="0"
                placeholder={'Price'}
                defaultValue={inputValues?.price}
                required
                className="w-32 px-4 py-2 text-sm border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm">
                Pick Up Time
              </label>
              {/* <span>From</span> */}
              <input 
              type="time" 
              id="appt"
              name="timeFrom"
              min="00:00" 
              max="23:59" 
              defaultValue={inputValues?.timeFrom} 
              required 
              className="w-28 mr-1 px-4 py-2 text-sm border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"/>
              <span>to</span>
              <input 
              type="time" 
              id="appt" 
              name="timeTo"
              min="00:00" 
              max="23:59" 
              defaultValue={inputValues?.timeTo} 
              required
              className="w-32 ml-1 px-4 py-2 text-sm border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" />
            </div>
            <div>
              <label className="block mt-4 text-sm">
                Description
              </label>
              <textarea
              name="description"
              type="text"
              defaultValue={inputValues?.description}
              placeholder={'Describe the contents of your box, add any comments or just advise of any allergens'}
              className="w-full h-20 px-4 py-2 text-sm border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
              ></textarea>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="justify-center block w-1/2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                >
                {modalInfo.title === 'Edit box'
                ? <p>Edit</p>
                : <p>Create Box</p>}
              </button>
            </div>
          </form>
        </div>
        <div className="h-32 md:h-auto md:w-1/2">
          <img 
          className="w-full h-full object-cover rounded-lg"
          src="https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
          />
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
);
};
