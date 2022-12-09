<script lang="ts" setup>
import { useUser, logOut } from "@src/services/user";
import { router, goToLoginPage } from "@src/services/router";
const user = useUser();

const logoutUser = async () => {
  await logOut();
  goToLoginPage();
};
</script>

<template>
  <section id="topnav">
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
      </div>
      <div class="block md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full hidden flex-grow md:flex md:items-center md:w-auto">
        <div class="text-sm md:flex-grow">
          <router-link
            to="/"
            class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
            >Go to Home</router-link
          >
          <router-link
            to="/login"
            class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
            >Login</router-link
          >
          <a
            v-if="user"
            @click="logoutUser()"
            class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white"
          >
            Logout
          </a>
        </div>
        <div v-if="user">Hello {{ user.username }}</div>
      </div>
    </nav>
  </section>
</template>
