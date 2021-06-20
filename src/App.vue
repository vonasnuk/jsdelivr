<template>
    <v-app>
        <v-main>
            <Home />
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Home from './components/Home';
import Footer from "./components/Footer";


export default {
    name: 'App',

    components: {
        Footer,
        Home,
    },

    data: () => ({
        //
    }),
};
</script>
