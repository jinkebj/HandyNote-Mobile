<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <div>
        Settings
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<style scoped>
.page {
  height: 100%; /* needed for proper layout */
}

body {
  overflow: hidden;
}

.page {
  display: flex;
  flex-direction: column;
}

.page-header {
  flex: 0 0 auto;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}

.page-footer {
  flex: 0 0 auto;
}
</style>

<script>
import MyHeader from '@/components/TopBar'
import MyFooter from '@/components/BottomBar'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
