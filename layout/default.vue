<template>
  <v-app dark>
    <v-app-bar clipped-left fixed app color="primary">
      <v-btn dark icon @click="toggleTheme">
        <v-icon>{{
          $vuetify.theme.dark
            ? 'mdi-white-balance-sunny'
            : 'mdi-moon-waxing-crescent'
        }}</v-icon>
      </v-btn>
      <v-toolbar-title
        style="width: 250px"
        class="ml-0 pl-4 hidden-sm-and-down white--text"
        v-text="title"
      />
      <slot name="header"></slot>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot name="content"></slot>
      </v-container>
    </v-main>
    <v-footer app inset absolute elevation="4">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} —
        <strong>{{ title }}</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MainLayout extends Vue {
  title = 'GeschenkeInspirator'

  toggleTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark

    this.$cookies.set('darkMode', this.$vuetify.theme.dark.toString(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
    })
  }

  mounted() {
    const theme = this.$cookies.get('darkMode', { parseJSON: false })
    if (theme !== undefined) {
      this.$vuetify.theme.dark = theme == 'true'
    }
  }
}
</script>
