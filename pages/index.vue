<template>
  <main-layout>
    <template #content>
      <v-row align-content="center">
        <GeschenkUebersicht
          v-for="(geschenk, i) in geschenke"
          :key="geschenk.name"
          v-intersect.once="i >= geschenke.length - 6 ? loadMore : () => {}"
          :geschenk="geschenk"
        >
        </GeschenkUebersicht>
      </v-row>
      <v-row
        v-if="queryResult.totalCount === 0"
        justify="center"
        align-content="center"
        align="center"
      >
        <v-card-title>
          Keine Ergebnisse gefunden. Versuche deine Suche zu vergröbern.
        </v-card-title>
      </v-row>
      <div class="text-center">
        <v-progress-circular
          v-if="isLoading"
          :width="10"
          size="100"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template #drawer> </template>
    <template #header>
      <v-text-field
        v-model="currentFilters.name"
        flat
        solo-inverted
        hide-details
        clearable
        dark
        dense
        label="Suchen"
        prepend-inner-icon="mdi-magnify"
        @input="searchAgain"
      ></v-text-field>
      <v-btn
        dark
        icon
        @click="
          currentFilters.ascending = !currentFilters.ascending
          searchAgain()
        "
        ><v-icon>{{
          currentFilters.ascending
            ? 'mdi-sort-descending'
            : 'mdi-sort-ascending'
        }}</v-icon></v-btn
      >
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
            @click="showSearchDrawer = !showSearchDrawer"
            ><v-icon>mdi-filter</v-icon></v-btn
          >
        </template>
        <span>Test</span>
      </v-tooltip>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import {
  Anlass,
  Empfaenger,
  EmpfaengerVerfeinerung,
  Geschenk,
  Verhaeltnis,
} from '~/model/General'
import MainLayout from '~/layout/default.vue'
import GeschenkUebersicht from '~/components/GeschenkUebersicht.vue'
import 'vuetify/dist/vuetify.min.css'

@Component({
  components: { MainLayout, GeschenkUebersicht },
})
export default class IndexPage extends Vue {
  queryResult = { geschenke: [], totalCount: 0 }
  geschenke: Geschenk[] = [
    {
      name: 'Rosenstrauß',
      internalID: 'rosenstrauß',
      details:
        'Das klassiker Geschenk für den Muttertag. Mit einen Rosenstrauß kann man nichts falsch machen und macht jeden Empfänger glücklich.',
      vorschauBild: 'https://loremflickr.com/800/400/rose',
      anlass: Anlass.Muttertag,
      preis: 5.0,
      empfaenger: Empfaenger.Erwachsener,
      verfeinerung: EmpfaengerVerfeinerung.Weiblich,
      verhaeltnis: Verhaeltnis.Mutter,
      beliebtheit: 5.0,
      anzahlBewertungen: 100,
      tags: ['Blumen', 'Strauß', 'Mutter'],
    },
  ]

  currentFilters = {
    ascending: false,
    order: 0,
    pageSize: 25,
    name: '',
  }

  isLoading = false

  showSearchDrawer = false

  searchDebounce: ReturnType<typeof setTimeout> = setTimeout(() => '', 10)

  async asyncData({ $axios }: Context) {
    // Fetch Data
  }

  // Debounce the search
  async searchAgain() {
    clearTimeout(this.searchDebounce)

    this.searchDebounce = setTimeout(() => {
      this.search()
    }, 200)
  }

  async loadMore(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ) {}

  async search() {
    this.isLoading = true

    // Fetch gifts

    this.isLoading = false
  }
}
</script>
