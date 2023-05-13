<template>
  <div>
    <router-view></router-view>
    <ContactList />
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue';

export default {
  name: 'App',
  components: {
    ContactList
  }
};
</script>
