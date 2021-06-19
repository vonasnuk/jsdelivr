<template>
  <div>
    <v-container>
      <v-text-field label="Search" v-model="searchData" v-on:keyup="getSearchData"></v-text-field>
      <v-btn
          color="secondary"
          v-on:click="getSearchData"
      >
        Search
      </v-btn>
      <v-btn class="float-right" v-for="(name, index) in allLibrary" :key="index" v-on:click="searchData = name; getSearchData()">
        {{ name }}
      </v-btn>
      <v-row class="col-12">
        <v-simple-table class="col-12" v-if="getLibraryBySearch">
          <template v-slot:default>
            <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Version
              </th>
              <th>
                Link JSON
              </th>
            </tr>
            </thead>
            <tbody>
             <tr v-for="(library, index) in getLibraryBySearch.versions" v-if="index < 10">
               <td>{{searchData}}</td>
               <td v-on:click="getItem(library)" class="table-version" title="Сlick to learn more">{{ library }}</td>
               <td><a target="_blank" :href='`https://data.jsdelivr.com/v1/package/npm/${searchData}@${library}`'>Link</a></td>
             </tr>
            </tbody>
            <v-pagination
                class="text-center"
                v-model="page"
                :length="6"
            ></v-pagination>
          </template>
        </v-simple-table>

        <div class="text-center">
          <v-dialog
              v-model="dialog"
              width="500"
          >
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--              <v-btn-->
<!--                  color="red lighten-2"-->
<!--                  dark-->
<!--                  v-bind="attrs"-->
<!--                  v-on="on"-->
<!--              >-->
<!--                Click Me-->
<!--              </v-btn>-->
<!--            </template>-->

            <v-card v-if="getLibraryBySearch">
              <v-card-title class="text-h5 grey lighten-2">
                {{ this.detailInput.name }}
              </v-card-title>
              <v-card-text>
                {{ this.detailInput.version }}
              </v-card-text>
              <v-card-text>
                Last version: <a  target="_blank" :href='`https://cdn.jsdelivr.net/npm/${searchData}@${getLibraryBySearch.tags.latest}/`'>{{ getLibraryBySearch.tags.latest }}</a> <br>
                Open CDN files: <a target="_blank" :href='`https://cdn.jsdelivr.net/npm/${searchData}@${this.detailInput.version}/`'>Link</a>
              </v-card-text>


              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      searchData: '',
      allLibrary: ['jquery', 'bootstrap', 'wordpress', 'slick-carousel', 'webshim'],
      page: 1,
      dialog: false,
      detailInput: {name: null, version: null}
    }
  },
  computed: mapGetters(['getLibraryBySearch']),
  methods: {
    ...mapActions(['fetchGetLibrary']),
    getSearchData() {
      this.fetchGetLibrary(this.searchData)
    },
    getItem(library) {
      this.detailInput.name = this.searchData
      this.detailInput.version = library
      this.dialog = true
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  .v-btn {
    margin: 0 10px;
  }
  .table-version{
    font-weight: bold;
    cursor: pointer;
  }
</style>