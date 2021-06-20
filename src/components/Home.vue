<template>
    <div>
        <v-container>
            <div class="search-menu">
                <v-text-field label="Search" v-model="searchData" v-on:keyup="getSearchData"></v-text-field>
                <v-btn
                    color="secondary"
                    v-on:click="getSearchData"
                >
                    Search
                </v-btn>
            </div>
            <div class="quick-start">
                <v-btn class="float-right" v-for="(name, index) in allLibrary" :key="index"
                       v-on:click="searchData = name; getSearchData()">
                    {{ name }}
                </v-btn>
            </div>
            <v-row class="col-12">
                <v-simple-table class="col-12 table-container" v-if="getLibraryBySearch">
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
                        <tr v-for="(library, index) in getLibraryBySearch.versions"
                            v-if="index < inputOnPage.max && index >= inputOnPage.min"
                        >
                            <td>{{ searchData }}</td>
                            <td v-on:click="getItem(library)" class="table-version" title="Сlick to learn more">
                                {{ library }}
                            </td>
                            <td><a target="_blank"
                                   :href='`https://data.jsdelivr.com/v1/package/npm/${searchData}@${library}`'>Link</a>
                            </td>
                        </tr>
                        </tbody>
                        <v-pagination
                            class="pagination"
                            v-model="page"
                            :length="getPagesLength"
                        ></v-pagination>
                    </template>
                </v-simple-table>

                <div class="text-center">
                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <v-card v-if="getLibraryBySearch">
                            <v-card-title class="text-h5 grey lighten-2">
                                {{ this.detailInput.name }}
                            </v-card-title>
                            <v-card-text>
                                {{ this.detailInput.version }}
                            </v-card-text>
                            <v-card-text>
                                Last version: <a target="_blank"
                                                 :href='`https://cdn.jsdelivr.net/npm/${searchData}@${getLibraryBySearch.tags.latest}/`'>{{
                                    getLibraryBySearch.tags.latest
                                }}</a> <br>
                                Open CDN files: <a target="_blank"
                                                   :href='`https://cdn.jsdelivr.net/npm/${searchData}@${this.detailInput.version}/`'>Link</a>
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
            detailInput: {name: null, version: null},
            inputOnPage: {min: 0, max: 10}
        }
    },
    computed: {
        ...mapGetters(['getLibraryBySearch']),
        getPagesLength: function () {
            return Math.ceil(this.getLibraryBySearch.versions.length / 10)
        }
    },
    watch: {
        page: function () {
            this.inputOnPage.max = 10 * this.page
            this.inputOnPage.min = this.inputOnPage.max - 10
            console.log(this.inputOnPage)
        }
    },
    methods: {
        ...mapActions(['fetchGetLibrary']),
        getSearchData() {
            this.page = 1
            this.fetchGetLibrary(this.searchData)
        },
        getItem(library) {
            this.detailInput.name = this.searchData
            this.detailInput.version = library
            this.dialog = true
        },

    },
    mounted() {

    }
}
</script>

<style lang="scss">
.search-menu {
    display: flex;
    max-width: 100%;
    align-items: baseline;
}

.quick-start {
    display: flex;
}

.table-container {

    table {
        tr {
            td {
                width: 33%;
            }
        }
    }
}

.pagination {
    ul {
        display: flex;
        justify-content: left;
        margin-top: 20px;
    }
}

.v-btn {
    margin: 0 10px;
}

.table-version {
    font-weight: bold;
    cursor: pointer;
}

@media (max-width: 768px) {
    .quick-start {
        display: grid;
        grid-template-columns: 1fr 1fr;
        button {
            margin-top: 10px;
        }
    }
    .pagination{
        max-width: 33vw;
    }
}
</style>