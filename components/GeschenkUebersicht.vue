<style>
.black-gradient {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0)
  );
}
</style>
<template>
  <v-col cols="12" lg="4" :xl="$vuetify.breakpoint.width > 2500 ? 3 : 4">
    <v-card
      rounded="lg"
      nuxt
      hover
      outlined
      :to="'/show/' + geschenk.internalID"
    >
      <v-row no-gutters>
        <v-img
          :src="geschenk.vorschauBild"
          class="rounded-lg grey lighten-1 align-end elevation-2"
          height="280px"
          width="100%"
          :gradient="
            geschenk.vorschauBild.length === 0
              ? 'to top right, rgba(90,109,83,.33), rgba(248,255,247,.7)'
              : ''
          "
        >
          <v-row
            no-gutters
            align="center"
            justify="space-between"
            class="pb-1 px-2 pt-3 black-gradient"
          >
            <div>
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
            </div>

            <div v-if="geschenk.schwierigkeit !== undefined">
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                    <v-rating
                      color="#EF5350"
                      background-color="#EF5350"
                      half-increments
                      dense
                      class="d-inline-block"
                      readonly
                      half-icon="mdi-circle-half-full"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      length="5"
                      :value="geschenk.schwierigkeit * 5"
                    />
                  </div>
                </template>
                <span>Schwierigkeit</span>
              </v-tooltip>
            </div>
          </v-row>
        </v-img>

        <v-col>
          <v-row dense no-gutters>
            <v-col
              class="text-truncate pa-2 px-3"
              style="
                font-size: 1.25rem;
                font-weight: 500;
                letter-spacing: 0.0125em;
                line-height: 2rem;
              "
            >
              {{ geschenk.name }}
            </v-col>
          </v-row>

          <v-card-text class="pt-0">
            <v-card-subtitle class="pb-0 pt-0 text-no-wrap text-truncate">
              {{ geschenk.details }}
            </v-card-subtitle>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-card-text class="pt-0">
            <v-row
              no-gutters
              class="py-1"
              align="center"
              align-content="center"
            >
              <div class="pt-1">Kategorie:</div>
            </v-row>
            <v-row
              no-gutters
              class="py-1"
              align="center"
              align-content="center"
            >
              <div class="pt-1">Kosten: {{ geschenk.preis.toFixed(2) }}€</div>
              <div></div>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Geschenk } from '~/model/General'

@Component({})
export default class GeschenkUebersicht extends Vue {
  @Prop() geschenk!: Geschenk

  get kategorieIcon(): string[] {
    return []
  }
}
</script>
