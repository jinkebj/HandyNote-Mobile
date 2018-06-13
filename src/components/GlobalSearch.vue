<template>
  <div class="page">
    <mu-appbar>
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-text-field class="appbar-search-field" slot="left" hintText="Global Search" v-model="searchStr" />
      <mu-icon-button icon="search" slot="right" @click="startSearch" />
    </mu-appbar>

    <div class="page-content">
    </div>
  </div>
</template>

<style>
.appbar-search-field {
  color: #FFF;
  margin-bottom: 0;
}

.appbar-search-field .mu-text-field-hint {
  color: #B9E1FF;
}

.appbar-search-field .mu-text-field-input {
  color: #FFF;
}

.appbar-search-field .mu-text-field-focus-line {
  background-color: #FFF;
}
</style>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}
</style>

<script>
export default {
  data () {
    return {
      searchStr: ''
    }
  },

  methods: {
    startSearch () {
      if (this.searchStr.length > 0) this.$router.replace({path: '/search-result', query: {searchStr: this.searchStr}})
    }
  }
}
</script>
