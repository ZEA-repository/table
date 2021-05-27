<template>
  <ValidationProvider
    tag="div"
    class="field"
    :rules="rules"
    :name="name"
    :vid="vid"
    v-slot="{ errors }"
  >
    <label class="label">{{ name }}</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" :type="type" v-model="currentValue" />
      <span class="icon is-left" v-show="icon">
        <i class="mdi" :class="icon"></i>
      </span>
      <span class="icon is-right" v-show="errors.length > 0">
        <i class="mdi mdi-alert"></i>
      </span>
    </div>
    <p class="help is-danger">{{ errors[0] }}</p>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";

extend("phone", (value) => {
  return value.match(/^\(?\d{3}\)?\d{3}-?\d{4}$/);
});

export default {
  name: "ValidationInput",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: [String, Object],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    vid: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    currentValue: "",
  }),
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>
