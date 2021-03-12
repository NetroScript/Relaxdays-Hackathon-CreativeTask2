<template>
  <main-layout>
    <template #content>
      <v-card class="my-n3" style="background-color: rgba(0, 0, 0, 0.07)">
        <v-card class="my-3 py-4 px-1">
          <h1 class="text-center text-lg-h3 text-h6">{{ geschenk.name }}</h1>
        </v-card>

        <v-row class="mx-2">
          <v-col cols="12" lg="6">
            <v-responsive
              v-if="geschenk.vorschauBilder.length > 0"
              max-width="1200px"
              aspect-ratio="2"
              class="mx-auto"
            >
              <v-carousel continuous height="800px">
                <v-carousel-item
                  v-for="(item, i) in geschenk.vorschauBilder"
                  :key="i"
                  :src="`${item}`"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                >
                </v-carousel-item>
              </v-carousel>
            </v-responsive>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card
              class="mx-auto py-4 px-1"
              :height="$vuetify.breakpoint.lgAndUp ? '800px' : 'initial'"
            >
              <v-card-title>
                Beschreibung:

                <v-spacer />
                <v-card color="primary" class="px-3 py-2">
                  Kosten: {{ geschenk.preis.toFixed(2) }}€
                </v-card>
              </v-card-title>
              <v-card-text>
                {{ geschenk.details }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title>
                <div class="mt-2">Bewertung:</div>

                <div class="ml-3">
                  <v-rating
                    color="#FFD740"
                    half-increments
                    dense
                    class="d-inline-block"
                    readonly
                    half-icon="mdi-star-half-full"
                    length="5"
                    :value="geschenk.beliebtheit"
                  />
                  <div
                    class="grey--text pl-2 d-inline-block"
                    style="padding-top: 5px"
                  >
                    ({{ geschenk.anzahlBewertungen }})
                  </div>
                </div></v-card-title
              >
              <v-divider></v-divider>
              <v-card-title> Geeignet für folgende Anlässe: </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="(anlass, i) in geschenk.anlass"
                  :key="'anlass-' + i"
                  color="primary"
                  class="mx-2 my-1"
                >
                  {{ anlass }}
                </v-chip>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title> Tags: </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="(tag, i) in geschenk.tags"
                  :key="'tag-' + i"
                  color="primary"
                  class="mx-2 my-1"
                >
                  {{ tag }}
                </v-chip>
              </v-card-text>
              <v-divider
                v-if="geschenk.empfaengerAlter !== undefined"
              ></v-divider>
              <v-card-title v-if="geschenk.empfaengerAlter !== undefined">
                Besonders geeignet für
                {{ aktuelleAltersgruppe }}.
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <template #header>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            right
            icon
            v-bind="attrs"
            v-on="on"
            @click="window.location.href = '/'"
            ><v-icon>mdi-home</v-icon></v-btn
          >
        </template>
        <span>Zurück zur Übersicht</span>
      </v-tooltip>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import '@nuxtjs/axios'
import { Component, Vue } from 'nuxt-property-decorator'
import { Empfaenger, Geschenk } from '~/model/General'
import MainLayout from '~/layout/default.vue'

@Component({
  components: { MainLayout },
})
export default class IndexPage extends Vue {
  geschenk: Geschenk

  // Load the data from the server on page load
  async asyncData({ $content, route, error }: Context) {
    let geschenk: Geschenk

    try {
      geschenk = (
        await $content('', { deep: true })
          .where({ internalID: route.params.id })
          .fetch<Geschenk>()
      )[0]
    } catch (e) {
      error({ statusCode: 418, message: 'ERROR.UNKNOWN' })
      return {}
    }

    return {
      geschenk,
    }
  }

  get aktuelleAltersgruppe() {
    switch (this.geschenk.empfaengerAlter) {
      case Empfaenger.Baby:
        return 'Babies'
      case Empfaenger.Kleinkind:
        return 'Kleinkinder'
      case Empfaenger.Jugendlicher:
        return 'Jugendliche'
      case Empfaenger.JungerErwachsener:
        return 'junge Erwachsene'
      default:
        return 'Erwachsene'
    }
  }

  head() {
    return {
      title: this.geschenk.name,
    }
  }
}
</script>
