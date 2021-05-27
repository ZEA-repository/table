<template>
  <div class="card">
    <div class="card-content">
      <ValidationObserver
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="onSubmit"
      >
        <ValidationInput
          v-model="firstName"
          name="First Name"
          rules="required|alpha_spaces"
          icon="mdi-form-textbox"
        />
        <ValidationInput
          v-model="lastName"
          name="Last Name"
          rules="required|alpha_spaces"
          icon="mdi-form-textbox"
        />
        <ValidationInput
          v-model="email"
          name="Email"
          rules="required|email"
          icon="mdi-email"
        />
        <ValidationInput
          v-model="phone"
          name="Phone"
          rules="required|phone"
          icon="mdi-phone"
        />
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" type="submit" :disabled="invalid">
              <i class="mdi mdi-content-save"></i>
              <span>Save</span>
            </button>
          </div>
          <div class="control">
            <a class="button is-light" @click="$emit('cancel')">Cancel</a>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidationInput from "@/components/ValidationInput";

export default {
  components: {
    ValidationObserver,
    ValidationInput,
  },
  props: ["columns", "firstUserId"],
  data() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    onSubmit() {
      const form = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        address: {
          streetAddress: "unknown",
          city: "unknown",
          state: "unknown",
          zip: "unknown",
        },
        description: "unknown",
      };
      this.$emit("submit", form);
    },
  },
};
</script>
