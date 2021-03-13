<template>
  <main-layout>
    <template #before-content>
      <v-scroll-y-transition>
        <keep-alive>
          <v-banner
            :key="filterMenuAnzeigen && !bannerSichtbar"
            v-intersect="bannerIntersect"
            class="blue darken-1 text--white pb-0 mb-n8"
            :sticky="filterMenuAnzeigen"
          >
            <v-main class="pb-0">
              <v-container>
                <GeschenkFilterComponent
                  class="text--white"
                  :aktueller-filter="currentFilters"
                  :search-again="searchAgain"
                ></GeschenkFilterComponent>
              </v-container>
            </v-main>
          </v-banner>
        </keep-alive>
      </v-scroll-y-transition>
    </template>
    <template #content>
      <v-row align-content="center">
        <GeschenkUebersicht
          v-for="(geschenk, i) in geschenke"
          :key="geschenk.internalID"
          v-intersect.once="i >= geschenke.length - 2 ? loadMore : () => {}"
          :geschenk="geschenk"
        >
        </GeschenkUebersicht>
      </v-row>
      <v-row
        v-if="geschenke.length === 0 && !isLoading"
        justify="center"
        align-content="center"
        align="center"
        class="py-4"
      >
        <v-card>
          <v-card-title>
            Keine Ergebnisse gefunden. Versuche deine Suche zu vergröbern.
          </v-card-title></v-card
        >
      </v-row>
      <v-row
        v-if="isLoading"
        justify="center"
        align-content="center"
        align="center"
        class="py-8"
      >
        <div class="text-center">
          <v-progress-circular
            :width="10"
            size="100"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-row>
      <v-row
        v-if="geschenke.length > 0 && !isLoading && reachedEnd"
        justify="center"
        align-content="center"
        align="center"
        class="py-4"
      >
        <v-card>
          <v-card-title> Es gibt keine weiteren Ergebnisse. </v-card-title>
        </v-card>
      </v-row>
    </template>
    <template #drawer> </template>
    <template #header>
      <v-text-field
        v-model="currentFilters.keyword"
        flat
        solo-inverted
        :loading="isLoading"
        hide-details
        clearable
        dark
        dense
        label="Suchen"
        prepend-inner-icon="mdi-magnify"
        @input="searchAgain"
      ></v-text-field>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
            @click="filterMenuAnzeigen = !filterMenuAnzeigen"
            ><v-icon>mdi-pin</v-icon></v-btn
          >
        </template>
        <span>Suchfilter anheften</span>
      </v-tooltip>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { Geschenk, GeschenkFilter } from '~/model/General'
import MainLayout from '~/layout/default.vue'
import GeschenkUebersicht from '~/components/GeschenkUebersicht.vue'
import 'vuetify/dist/vuetify.min.css'
import GeschenkFilterComponent from '~/components/GeschenkFilter.vue'

@Component({
  components: { MainLayout, GeschenkUebersicht, GeschenkFilterComponent },
})
export default class IndexPage extends Vue {
  reachedEnd = false
  geschenke: Geschenk[] = []
  bannerSichtbar = true

  currentFilters: GeschenkFilter = {
    keyword: '',
    preis: [0, 100000000],
    lustig: [0, 1],
    romantisch: [0, 1],
    edel: [0, 1],
    besonders: [0, 1],
    nuetzlich: [0, 1],
    ascending: false,
    order: 0,
    pageSize: 25,
  }

  isLoading = false

  lastSkip = 0

  filterMenuAnzeigen = false

  searchDebounce: ReturnType<typeof setTimeout> = setTimeout(() => '', 10)

  async asyncData({ $content }: Context) {
    const geschenke = await $content('geschenke', { deep: true })
      .limit(25)
      .fetch<Geschenk>()

    return {
      geschenke,
    }
  }

  // Debounce the search
  async searchAgain() {
    clearTimeout(this.searchDebounce)

    this.searchDebounce = setTimeout(async () => {
      this.lastSkip = 0
      this.reachedEnd = false
      await this.search()
    }, 200)
  }

  async loadMore(
    _entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver,
    isIntersecting: boolean
  ) {
    if (isIntersecting && !this.isLoading && !this.reachedEnd) {
      await this.search()
    }
  }

  async bannerIntersect(entries: IntersectionObserverEntry[]) {
    this.bannerSichtbar = entries[0].isIntersecting || this.filterMenuAnzeigen
  }

  async search() {
    this.isLoading = true

    if (this.lastSkip === 0) {
      this.geschenke.splice(0)
    }

    // Fetch gifts

    const geschenkeQuery = this.$content('geschenke', { deep: true }).search(
      this.currentFilters.keyword
    )

    const rangeProperties = [
      'preis',
      'lustig',
      'romantisch',
      'edel',
      'besonders',
      'nuetzlich',
    ] as const
    const query: object = {
      beliebtheit: { $gte: this.currentFilters.beliebtheit || 0 },
    }
    for (const rangeProperty of rangeProperties) {
      // @ts-ignore: I know what I want to do here, if anyone wants to write up the types for this, feel free to do so
      query[(rangeProperty === 'preis' ? '' : 'attribute.') + rangeProperty] = {
        $between: [
          this.currentFilters[rangeProperty][0],
          this.currentFilters[rangeProperty][1],
        ],
      }
    }

    if (this.currentFilters.anlass != undefined) {
      Object.assign(query, {
        anlass: { $contains: this.currentFilters.anlass },
      })
    }

    if (this.currentFilters.alter != undefined) {
      Object.assign(query, {
        empfaengerAlter: this.currentFilters.alter,
      })
    }

    if (this.currentFilters.verfeinerung != undefined) {
      Object.assign(query, {
        verfeinerung: this.currentFilters.verfeinerung,
      })
    }

    if (this.currentFilters.verhaeltnis != undefined) {
      Object.assign(query, {
        verhaeltnis: this.currentFilters.verhaeltnis,
      })
    }

    geschenkeQuery.where(query)

    const geschenke = (await geschenkeQuery
      .limit(this.currentFilters.pageSize)
      .skip(this.lastSkip)
      .fetch<Geschenk>()) as Geschenk[]

    if (geschenke.length === 0) {
      this.reachedEnd = true
    }

    this.geschenke.push(...geschenke)

    this.lastSkip += geschenke.length
    this.isLoading = false
  }
}
</script>
