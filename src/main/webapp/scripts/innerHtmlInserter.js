/**
 * Script for Nav
 * 
 * USAGE :     <div id="nav"/> (An element with ID = "nav" ) must have in host HTML page
 * 
 * How it work? : Inner HTML that are generated by mode are go into modal!
 * 
 * How it change mode? : Change URL param and it trigger UI updates.

 */

const navContainer = document.getElementById("nav");

let isLoggedIn = localStorage.getItem("isLoggedIn")

const url = new URL(window.location);
path = url.pathname.split("/");
currentRoute = path[path.length - 1];
const navInnerHtml = `      <div id="logo" class="w-1/3">
        <a href="/LBMS/" id="logo" class="w-16 h-16 flex items-center">
          <img src="assets/logo/logo.png" alt="Logo" class="w-16 h-16" />
        </a>
      </div>

      <div class="flex items-center w-auto h-2/3 space-x-10 mb-2">
        <a
          href="/LBMS/#"
          class="text-[--secondary] font-semibold text-xl hover:underline underline-offset-2 ${currentRoute == "index.html" ? "underline": currentRoute == "" ? "underline": ""}"
          >Home</a
        >
        <a
          href="LBMS/#"
          class="text-[--secondary] font-semibold text-xl hover:underline underline-offset-2 ${currentRoute == "blog.html" ? "underline": ""}"
          >Blog</a
        >        <a
          href="LBMS/#"
          class="text-[--secondary] font-semibold text-xl hover:underline underline-offset-2 ${currentRoute == "blog.html" ? "underline": ""}"
          >Category</a
        >
        <a
          href="LBMS/#"
          class="text-[--secondary] font-semibold text-xl hover:underline underline-offset-2 ${currentRoute == "blog.html" ? "underline": ""}"
          >About</a
        >
      </div>
      <div class="flex items-center justify-end w-1/3 h-2/3 space-x-3 mb-2">
        <form
          class="flex w-[25ch] focus-within:w-auto h-full items-center"
          action=""
        >
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search books..."
            class="px-2 py-[6px] w-full transition-transform duration-1000 h-2/3 rounded-none border-b-2 border-[--secondary] focus:outline-none"
          />

          <button
            type="submit"
            class="h-2/3 border-b-2 py-[5px] px-3 flex items-center border-[--secondary] bg-[--secondary] text-gray-200 text-center"
          >
            Search
          </button>
        </form>
       ${isLoggedIn ? `
            <a href="/LBMS/user.jsp" id="userProfile" class="h-2/3">
                <img src="assets/img/sample4.jpg" alt="User Profile" class="w-12 h-12" />
            </a>
        ` : `
            <button
                id="openModalBtn"
                class="h-2/3 border-b-2 py-[5px] px-3 flex items-center border-[--secondary] bg-[--secondary] text-gray-200 text-center"
            >
                Sign In
            </button>
        `}
      </div>`;

navContainer.innerHTML = navInnerHtml;

/**
 * Script for authentication
 * 
 * USAGE :     <div id="modal"/> (An element with ID = "modal" ) must have in host HTML page
 * 
 * How it work? : Inner HTML that are generated by mode are go into modal!
 * 
 * How it change mode? : Change URL param and it trigger UI updates.

 */

// function(mode){
//   return innerhtml with modex
// }

const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");

const getModalContent = (mode) => `
  <div id="" class="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
    <div class="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <button id="authClose" class="absolute top-4 right-5 hover:bg-gray-300 rounded-sm px-4 py-2">
        Close
      </button>
      <h1 class="text-2xl font-bold mb-6 text-center text-[--secondary]">${
        mode === "SignUp" ? "Sign Up" : mode === "SignIn" ? "Sign In" : "Error"
      }</h1>
      <form action="authServlet" method="POST" class="space-y-4">
              ${
          mode == "SignUp"
            ? `
        <div>
          <label for="name" class="block text-sm font-medium text-[--secondary]">Name</label>
          <input type="text" id="name" name="name" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
        </div>`:""}
        <div>
          <label for="email" class="block text-sm font-medium text-[--secondary]">Email</label>
          <input type="email" id="email" name="email" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
        </div>
        ${
          mode == "SignUp"
            ? `
         <div>
          <label for="phone" class="block text-sm font-medium text-[--secondary]">Phone</label>
          <input type="tel" id="phone" name="phone" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
        </div>
			<div>
			<label for="userType" class="block text-sm font-medium text-[--secondary]">User Type</label>
            <div class="flex mt-1">
                <select
                  id="userType"
                  name="userType"
                  class="mt-1 w-1/3 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]"
                >
                  <option value="KPTMYK">ID</option>
                  <option value="staff">Staff</option>
                </select>
                <input
                  type="text"
                  id="idOrDept"
                  name="idOrDept"
                  class="mt-1 p-2 w-2/3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]"
                  placeholder="Enter ID or Department"
                />
            </div></div>

            <input type="hidden" name="mode" value="SignUp">
          `
            : `<input type="hidden" name="mode" value="SignIn">`
        }
        <div>
          <label for="password" class="block text-sm font-medium text-[--secondary]">Password</label>
          <input type="password" id="password" name="password" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
        </div>
        <button type="submit" class="w-full py-2 px-4 bg-[--secondary] text-white font-semibold rounded-md hover:bg-[--secondary] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary]">${
          mode === "SignUp" ? "Sign Up" : "Sign In"
        }</button>
      </form>
      <div class="space-y-2 text-xs text-right space-x-1">
		${
      mode === "SignIn"
        ? `<span>Doesn't have an account?</span><button id="signUp" class="underline">Sign Up</button>`
        : `<span>Already have an account?</span><button id="signIn" class="underline">Sign In</button>`
    }
      </div>
    </div>
  </div>
`;

const updateURL = (mode) => {
  const url = new URL(window.location);
  url.searchParams.set("mode", mode);
  window.history.pushState({}, "", url);
};

const authModalToggler = (mode) => {
  if (modal == null) {
    alert("Auth modal is not available in this page!");
  }
  modal.innerHTML = getModalContent(mode);
  updateURL(mode);

  const closeBtn = document.getElementById("authClose");
  const signUpBtn = document.getElementById("signUp");
  const signInBtn = document.getElementById("signIn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.innerHTML = "";
      const url = new URL(window.location);
      url.searchParams.delete("mode");
      window.history.pushState({}, "", url);
    });
  }

  if (signUpBtn) {
    signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      authModalToggler("SignUp");
    });
  }

  if (signInBtn) {
    signInBtn.addEventListener("click", (e) => {
      e.preventDefault();
      authModalToggler("SignIn");
    });
  }
};

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    const mode = openModalBtn.textContent.trim().replace(" ", "");
    authModalToggler(mode);
  });
}



const footerInnerHtml = `        <div id="top" class="flex">
          <div id="left" class="w-1/3 flex justify-center items-center">
            <img
              src="./assets/logo/logo.png"
              class="w-52 h-full aspect-square"
              alt="logo"
            />
          </div>
          <div id="right" class="w-2/3 flex justify-around">
            <div class="">
              <p id="title" class="text-xl font-semibold text-[--text]">
                Quick Links
              </p>
              <div
                id="links"
                class="flex flex-col justify-center items-start space-y-2 mt-4"
              >
                <a href="/" class="text-md font-light hover:opacity-80">Home</a>
                <a href="/" class="text-md font-light hover:opacity-80"
                  >Articles</a
                >
                <a href="/" class="text-md font-light hover:opacity-80"
                  >Category</a
                >
                <a href="/" class="text-md font-light hover:opacity-80"
                  >About</a
                >
                <button
                  id="openModalBtn"
                  class="text-md font-light hover:opacity-80"
                >
                  Sign In
                </button>
                <button
                  id="openModalBtn"
                  class="text-md font-light hover:opacity-80"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div>
              <p id="title" class="text-xl font-semibold text-[--text]">
                Get In Touch
              </p>
              <div
                id="links"
                class="flex flex-col justify-center space-y-2 mt-4"
              >
                <a href="/" class="text-md font-light hover:opacity-80">Home</a>
                <a href="/" class="text-md font-light hover:opacity-80"
                  >Articles</a
                >
                <a href="/" class="text-md font-light hover:opacity-80"
                  >Category</a
                >
              </div>
            </div>
            <div>
              <p id="title" class="text-xl font-semibold text-[--text]">
                Location
              </p>
              <div
                id="links"
                class="flex flex-col justify-center space-y-2 mt-4"
              >
                <p class="text-md font-light hover:opacity-80">
                  Myeik-Tanithary Highway Road
                </p>
                <p class="text-md font-light hover:opacity-80">
                  Myeik Township
                </p>
                <p class="text-md font-light hover:opacity-80">
                  Tanithary Region
                </p>
                <p class="text-md font-light hover:opacity-80">Myanmar</p>
                <p class="text-md font-light hover:opacity-80">
                  Postal Code - 14051
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom" class="flex w-full mt-7">
          <p class="w-full border-t-2 border-black"></p>
          <p class="w-full text-center pb-5">2024@All right reserved.</p>
          <p class="w-full border-t-2 border-black"></p>
        </div>`

        const footer = document.getElementById("footer");

        footer.innerHTML = footerInnerHtml;