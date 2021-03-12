import { Framework } from 'vuetify'
import { NuxtCookies } from 'cookie-universal-nuxt'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@nuxt/types' {
  interface Context {
    $vuetify: Framework
    $cookies: NuxtCookies
  }

  interface NuxtAppOptions {
    $cookies: NuxtCookies
  }

  interface Configuration {
    $cookies: NuxtCookies
  }
}
