<template>
  <v-row class="white--text">
    <v-col cols="12" md="6">
      <span class="text-h6 mx-2 mb-1"> Anlass: </span>
      <v-select
        v-model="aktuellerFilter.anlass"
        :items="anlaesse"
        label="Anlass auswählen"
        persistent-hint
        return-object
        clearable
        dense
        dark
        class="mx-2"
        single-line
        @change="searchAgain"
      ></v-select>
      <div v-if="$vuetify.breakpoint.mdAndUp" style="height: 70px"></div>
      <span class="text-h6 mx-2 mb-1"> Preis: </span>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model.number="aktuellerFilter.preis[0]"
            type="number"
            label="Minimum"
            class="my-4 mx-2"
            hide-details
            dense
            dark
            min="0"
            required
            step="0.01"
            prepend-icon=""
            suffix="€"
            @keyup="checkPrices"
            @change="searchAgain"
        /></v-col>
        <v-col cols="6">
          <v-text-field
            v-model.number="aktuellerFilter.preis[1]"
            type="number"
            label="Maximum"
            class="my-4 mx-2"
            hide-details
            dense
            dark
            min="0"
            required
            step="0.01"
            prepend-icon=""
            suffix="€"
            @keyup="checkPrices"
            @change="searchAgain"
        /></v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-range-slider
        v-model="aktuellerFilter.lustig"
        min="0"
        max="1"
        step="0.05"
        dark
        color="#FDD835"
        track-color="#0277BD"
        thumb-color="#FBC02D"
        @change="searchAgain"
      >
        <template slot="append"
          ><v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >😂</v-icon
          ></template
        >
        <template slot="label">
          <div
            class="ml-n4"
            style="min-width: 90px; display: inline-block; text-align: right"
          >
            Lustig
          </div>
          <v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >😐</v-icon
          ></template
        >
      </v-range-slider>
      <v-range-slider
        v-model="aktuellerFilter.romantisch"
        min="0"
        max="1"
        step="0.05"
        dark
        color="#B71C1C"
        track-color="#0277BD"
        thumb-color="#D50000"
        @change="searchAgain"
      >
        <template slot="append"
          ><v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🌹</v-icon
          ></template
        >
        <template slot="label">
          <div
            class="ml-n4"
            style="min-width: 90px; display: inline-block; text-align: right"
          >
            Romantisch
          </div>

          <v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🥀</v-icon
          ></template
        >
      </v-range-slider>
      <v-range-slider
        v-model="aktuellerFilter.nuetzlich"
        min="0"
        max="1"
        step="0.05"
        dark
        color="#80DEEA"
        track-color="#0277BD"
        thumb-color="#4DD0E1"
        @change="searchAgain"
      >
        <template slot="append"
          ><v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🛠️</v-icon
          ></template
        >
        <template slot="label">
          <div
            class="ml-n4"
            style="min-width: 90px; display: inline-block; text-align: right"
          >
            Nützlich
          </div>
          <v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >💾</v-icon
          ></template
        >
      </v-range-slider>
      <v-range-slider
        v-model="aktuellerFilter.edel"
        min="0"
        max="1"
        dark
        step="0.05"
        color="#5E35B1"
        track-color="#0277BD"
        thumb-color="#512DA8"
        @change="searchAgain"
      >
        <template slot="append"
          ><v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🍷</v-icon
          ></template
        >
        <template slot="label">
          <div
            class="ml-n4"
            style="min-width: 90px; display: inline-block; text-align: right"
          >
            Edel
          </div>
          <v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🥛</v-icon
          ></template
        >
      </v-range-slider>
      <v-range-slider
        v-model="aktuellerFilter.besonders"
        min="0"
        max="1"
        dark
        step="0.05"
        color="#B2FF59"
        track-color="#0277BD"
        thumb-color="#64DD17"
        @change="searchAgain"
      >
        <template slot="append"
          ><v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🚀</v-icon
          ></template
        >
        <template slot="label">
          <div
            class="ml-n4"
            style="min-width: 90px; display: inline-block; text-align: right"
          >
            Besonders
          </div>
          <v-icon
            class="black--text"
            style="font-style: inherit; min-width: 33px"
            >🎁</v-icon
          ></template
        >
      </v-range-slider>
    </v-col>
    <v-expansion-panels flat tile dark>
      <v-expansion-panel
        style="background-color: rgba(0, 0, 0, 0.01)"
        class="white--text"
      >
        <v-expansion-panel-header class="text-center"
          >Weitere Filter</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-row class="pt-2">
            <v-col cols="6" md="3" class="pa-1">
              <v-select
                v-model="aktuellerFilter.alter"
                :items="altersGruppen"
                label="Alter auswählen"
                persistent-hint
                return-object
                clearable
                dense
                class="mx-2"
                @change="searchAgain"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3" class="pa-1">
              <v-select
                v-model="aktuellerFilter.verhaeltnis"
                :items="verhaeltnisGruppen"
                label="Verhältnis auswählen"
                persistent-hint
                return-object
                clearable
                dense
                class="mx-2"
                @change="searchAgain"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3" class="pa-1">
              <v-select
                v-model="aktuellerFilter.verfeinerung"
                :items="verfeinerungen"
                label="Geschlecht auswählen"
                persistent-hint
                return-object
                clearable
                dense
                class="mx-2"
                @change="searchAgain"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3" class="pa-1 text-center">
              <div
                style="
                  display: inline-block;
                  font-size: 14px;
                  position: absolute;
                  margin-top: -13px;
                  margin-left: -70px;
                "
              >
                Bewertung mindestens:
              </div>

              <v-rating
                v-model="aktuellerFilter.beliebtheit"
                background-color="grey lighten-2"
                color="warning"
                half-increments
                hover
                length="5"
                size="20"
                @input="searchAgain"
              ></v-rating>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import {
  Anlass,
  Empfaenger,
  EmpfaengerVerfeinerung,
  GeschenkFilter,
  Verhaeltnis,
} from '~/model/General'

@Component
export default class GeschenkFilterComponent extends Vue {
  @Prop() aktuellerFilter!: GeschenkFilter
  @Prop() searchAgain!: () => void

  checkPrices() {
    if (this.aktuellerFilter.preis[0] >= this.aktuellerFilter.preis[1]) {
      this.$set(
        this.aktuellerFilter.preis,
        1,
        this.aktuellerFilter.preis[0] + 5
      )
    }

    if (this.aktuellerFilter.preis[1] <= this.aktuellerFilter.preis[0]) {
      this.$set(
        this.aktuellerFilter.preis,
        1,
        this.aktuellerFilter.preis[0] + 1
      )
    }
  }

  anlaesse = Object.values(Anlass)

  altersGruppen = Object.values(Empfaenger)

  verhaeltnisGruppen = Object.values(Verhaeltnis)

  verfeinerungen = Object.values(EmpfaengerVerfeinerung)
}
</script>
