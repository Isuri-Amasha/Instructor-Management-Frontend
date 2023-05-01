import { Component } from "react";
class Home extends Component {
  render() {
    return (
      <div class="">
        <section class="">
          <div class="text-center bg-white text-gray-800 py-10 px-6">
            <h1 class="text-xl md:text-3xl xl:text-4xl font-bold tracking-tight uppercase mb-8 drop-shadow-md ">Automatrix <br />
              <span class="text-blue-950 font-serif font-light  ">driving school</span>
             
            </h1>
          </div>
        </section>

        <section class="px-36 py-2 mb-5 content-center ">
          <div class="container flex h-96 max-w-7xl flex-col justify-between rounded-lg bg-white dark:bg-neutral-700 drop-shadow-lg md:flex-row">
            <img
              class="rounded-t-lg object-center md:h-96 md:w-1/2 md:rounded-none md:rounded-l-lg"
              src="https://cdn.discordapp.com/attachments/835788455643840572/1102633551150723132/A-Driving-School-Can-Teach-You-Tricks-You-Will-Never-Learn-Elsewhere.jpg"
              alt="" />
            <div class="flex flex-col justify-start p-6">
              <p class="leading-6 text-center font-serif font-semibold text-lg max-w-xl  text-neutral-600 max-h-60 dark:text-neutral-200">
                <span class="text-3xl font-extrabold">T</span>he Automatrix driving school's instructor management system home page is a user-friendly dashboard
                that provides a comprehensive suite of tools for managing the school's operations.
                It allows administrators to access various features of the system such as instructor management,
                and instructor payment, as well as instructor feedback. With an intuitive interface, administrators can quickly
                view important metrics. The home page also provides various reports and customization options, making it an
                indispensable tool for driving school administrators looking to improve their operations and enhance the learning experience for their students.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;