<template>
    <div class="footer col-12">
        <v-footer dark color="blue" height="50px">
            Ivan Shcherban
            <a target="_blank" href="https://github.com/vonasnuk">
                <v-icon>mdi-github</v-icon>
            </a>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped lang="scss">
    .footer{
        max-width: 100vw;
        a {
            text-decoration: none;
            padding-left: 20px;
        }
    }

</style>