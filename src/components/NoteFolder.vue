<template>
  <md-list>
    <md-list-item md-expand-multiple>
        <md-icon>whatshot</md-icon>
        <span>News</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">World</md-list-item>
            <md-list-item class="md-inset">Americas</md-list-item>
            <md-list-item class="md-inset">Europe</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>

    <md-list-item md-expand-multiple>
        <md-icon>videogame_asset</md-icon>
        <span>Games</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">Console</md-list-item>
            <md-list-item class="md-inset">PC</md-list-item>
            <md-list-item class="md-inset">Phone</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>

    <md-list-item md-expand-multiple>
        <md-icon>video_library</md-icon>
        <span>Video</span>

        <md-list-expand>
        <md-list>
            <md-list-item class="md-inset">Humor</md-list-item>
            <md-list-item class="md-inset">Music</md-list-item>
            <md-list-item class="md-inset">Movies</md-list-item>
            <md-list-item class="md-inset">TV Shows</md-list-item>
        </md-list>
        </md-list-expand>
    </md-list-item>

    <md-list-item>
        <md-icon>shopping_basket</md-icon>
        <span>Shop</span>
    </md-list-item>
    </md-list>
</template>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
