<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <button class="button is-white" :disabled="value <= 1" @click="emit(1)">
        &lt;&lt;
      </button>
      <button
        class="button is-white"
        :disabled="value <= 1"
        @click="emit(value - 1)"
      >
        &lt;
      </button>
      <button
        class="button is-white"
        :class="{ 'is-primary is-light': num == value }"
        @click="emit(num)"
        v-for="num in pages"
        :key="num"
      >
        {{ num }}
      </button>
      <button
        class="button is-white"
        :disabled="value >= last"
        @click="emit(value + 1)"
      >
        &gt;
      </button>
      <button
        class="button is-white"
        :disabled="value >= last"
        @click="emit(last)"
      >
        &gt;&gt;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    perPage: Number,
    value: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    last() {
      return Math.ceil(this.total / this.perPage);
    },
    pages() {
      const span = Math.min(this.last, 5);
      const start = Math.min(Math.max(this.value - 2, 1), this.last - span + 1);

      return [...Array(span).keys()].map((k) => k + start);
    },
  },
  methods: {
    emit(page) {
      this.$emit("input", page);
    },
  },
};
</script>
