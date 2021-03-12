<template>
  <v-app>
    <v-app-bar clipped-left dark fixed app color="primary">
      <v-toolbar-title
        style="width: 250px"
        class="ml-0 pl-4 hidden-sm-and-down"
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
}
</script>
