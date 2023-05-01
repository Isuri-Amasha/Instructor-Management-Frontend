
function navbar() {
  return (
    <div>
      <nav className="flex flex-col w-full px-6 py-4 bg-white shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
        <div className="mb-2 sm:mb-0">
          <a href="/" className="text-xl no-underline duration-300 text-grey-darkest hover:text-blue-dark hover:font-bold">Instructors Home Page</a>
        </div>
        <div className='text-lg font-light hover:text-blue-dark'>
          <a href="/instructor" className="m-2 text-black no-underline duration-300 hover:text-blue-800 hover:font-normal">Instructor</a>
          <a href="/payment" className="m-2 text-black no-underline duration-300 hover:text-blue-800 hover:font-normal">Payment</a>
          <a href="/feedback" className="m-2 text-black no-underline duration-300 hover:text-blue-800 hover:font-normal">Feedbacks</a>
          {/* <a href="/idetails" className="m-2 text-black no-underline duration-300 hover:text-blue-800 hover:font-normal">Instructor Details</a> */}
        </div>
        {/* <div className="grid grid-cols-2 gap-1">
          <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
            <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
          </div>
          <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
            <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>
          </div>
        </div> */}
      </nav>
    </div>
  );
}

export default navbar;