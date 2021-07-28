<template>
  <!-- alert danger -->
  <div
    :class="typeClass"
    class="alert alert-dismissible fade show"
    role="alert"
    v-if="notification.type == 'danger'"
  >
    <i class="fas fa-times-circle mr-2 fa-lg"></i>
    {{ notification.message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <!-- alert success -->
  <div
    :class="typeClass"
    class="alert alert-dismissible fade show"
    role="alert"
    v-if="notification.type == 'success'"
  >
    <i class="fas fa-check-circle ml-2 fa-lg"></i>
    {{ notification.message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["notification"],

  computed: {
    typeClass() {
      return `alert-${this.notification.type}`;
    },
  },
};
</script>