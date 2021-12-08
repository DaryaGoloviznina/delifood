export const Footer = () => {
  return (
    <footer className="footer bg-green-700 relative pt-1 border-b-2 border-gray-700">
      <div className="container mx-auto px-6">

          <div className="sm:flex sm:mt-8">
              <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col">
                      <span className="font-small text-white text-3xl font-bold">DeliFood</span>
                      <span className=" text-gray-400 mb-2">Striving towards zero-waste step by step</span>
                      <span className="my-2"><a href="#" className="text-gray-200 text-md hover:text-gray-500">Contact Us</a></span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">Company</span>
                      <span className="my-2"><a href="#" className="text-gray-300 text-md hover:text-gray-500">About</a></span>
                      <span className="my-2"><a href="#" className="text-gray-300  text-md hover:text-gray-500">Careers</a></span>
                      <span className="my-2"><a href="#" className="text-gray-300 text-md hover:text-gray-500">Press</a></span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">Legal</span>
                      <span className="my-2"><a href="#" className="text-gray-300  text-md hover:text-gray-500">Terms & Conditions</a></span>
                      <span className="my-2"><a href="#" className="text-gray-300  text-md hover:text-gray-500">Privacy Policy</a></span>
                      <span className="my-2"><a href="#" className="text-gray-300  text-md hover:text-gray-500">Cookie Policy</a></span>
                  </div>
              </div>
          </div>
      </div>
      <div className="container mx-auto">
          <div className="mt-10 border-t-2 flex flex-col items-center">
              <div className="sm:w-2/3 text-center py-6">
                  <p className="text-sm text-gray-400 mb-2">
                      © 2021 by Elbrus Team
                  </p>
              </div>
          </div>
      </div>
    </footer>
  )
}
