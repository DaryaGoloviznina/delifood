import { Link } from "react-router-dom";

export const LinkButton = ({content = " ", link = " "}) => {

  return (
    <button className="rounded-md shadow">
      <Link to={link} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10">
        {content}
      </Link>
    </button>
  )
}
