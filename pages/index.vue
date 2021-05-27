<template>
  <section class="section">
    <div class="container">
      <div class="dropdown is-hoverable mr-1">
        <div class="dropdown-trigger">
          <button
            class="button"
            :class="{ 'is-primary': data_size === '' }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <span>Select dataset size</span>
            <span class="icon is-small">
              <i class="mdi mdi-menu-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item" @click="load('small')">
              Small
            </a>
            <a class="dropdown-item" @click="load('big')">
              Big
            </a>
          </div>
        </div>
      </div>
      <button class="button" @click="isAddRow = !isAddRow">
        <span class="icon">
          <i class="mdi mdi-plus"></i>
        </span>
        <span>Add row</span>
      </button>
      <button class="button" @click="load()" :disabled="data_size === ''">
        <span class="icon">
          <i class="mdi mdi-cloud-refresh"></i>
        </span>
        <span>Refresh data</span>
      </button>
      <div class="notification is-danger my-1" v-show="error">
        <button class="delete" @click="error = null"></button>
        Error while fetching data
      </div>
    </div>

    <section class="block my-2" v-show="isAddRow">
      <TableForm @submit="addRowToTable" @cancel="isAddRow = false" />
    </section>
    <div class="container">
      <Table :data="table_data" v-show="table_data.length > 0" />
    </div>
  </section>
</template>

<script>
import Table from "@/components/Table";
import TableForm from "@/components/TableForm";
export default {
  components: {
    Table,
    TableForm,
  },
  data() {
    return {
      table_data: [],
      data_size: "",
      isAddRow: false,
      isDropdownOpen: false,
      error: null,
    };
  },
  methods: {
    async load(size) {
      if (size) this.data_size = size;
      this.error = null;
      try {
        this.$nuxt.$loading.start();
        await this.fetch();
        this.$router.push({ query: { page: 1 } });
      } catch (error) {
        this.error = error;
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    async fetch() {
      let rows = 32;
      let delay = 0;
      if (this.data_size == "big") {
        rows = 1000;
        delay = 3;
      }
      this.table_data = await this.$axios.$get("http://www.filltext.com/", {
        params: {
          rows: rows,
          delay: delay,
          id: "{index}",
          firstName: "{firstName}",
          lastName: "{lastName}",
          email: "{email}",
          phone: "{phone|(xxx)xxx-xx-xx}",
          address: "{addressObject}",
          description: "{lorem|32}",
        },
      });
    },
    addRowToTable(row) {
      let id = 1000;
      if (this.table_data.length > 0)
        id = Math.min(...this.table_data.map((v) => v.id)) - 1;
      row.id = id;
      this.table_data.unshift(row);
      this.isAddRow = false;
    },
  },
};
</script>
