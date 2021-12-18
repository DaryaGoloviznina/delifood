export const FilterSelect = ({name, onChange, children}) => {

  return (
    <select
      name={name}
      onChange={onChange}
      className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
    >
      {children}
    </select>
  )
}