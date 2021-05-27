<template>
  <section class="section">
    <form @submit.prevent="filter">
      <div class="field is-grouped">
        <p class="control is-expanded has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Find in table"
            v-model="searchInput"
          />
          <span class="icon is-small is-left">
            <i class="mdi mdi-magnify"></i>
          </span>
        </p>
        <p class="control">
          <button class="button is-primary" type="search">
            Search
          </button>
        </p>
      </div>
    </form>
    <section class="section">
      <div class="container" v-if="filtered.length === 0">
        <div class="notification is-primary">
          No results found
        </div>
      </div>
      <div v-else>
        <Pagination
          :total="filtered.length"
          :perPage="perPage"
          v-model="page"
        />
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.field"
                @click="sort(col.field)"
              >
                {{ col.name }}
                <span v-if="sortColumn === col.field">
                  {{ sortAscending ? "▲" : "▼" }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in currentPage"
              :key="row.id"
              :class="{ 'is-selected': selectedRow.id == row.id }"
              @click="showUserInfo(row)"
            >
              <td v-for="col in columns" :key="col.field">
                {{ row[col.field] }}
              </td>
            </tr>
          </tbody>
        </table>

        <Pagination
          :total="filtered.length"
          :perPage="perPage"
          v-model="page"
        />
        <UserInfo
          v-if="Object.keys(selectedRow).length"
          :selected-row="selectedRow"
        />
      </div>
    </section>
  </section>
</template>

<script>
import Pagination from "./Pagination";
import UserInfo from "./UserInfo";
export default {
  components: {
    Pagination,
    UserInfo,
  },
  props: {
    data: Array,
  },

  data() {
    return {
      columns: [
        {
          field: "id",
          name: "ID",
        },
        {
          field: "firstName",
          name: "First Name",
        },
        {
          field: "lastName",
          name: "Last Name",
        },
        {
          field: "email",
          name: "E-Mail",
        },
        {
          field: "phone",
          name: "Phone",
        },
      ],
      sortColumn: "id",
      searchInput: "",
      search: "",
      perPage: 50,
      sortAscending: true,
      selectedRow: {},
      page: 1,
    };
  },
  mounted() {
    this.page = Number(this.$route.query.page || 1);
  },
  computed: {
    filtered() {
      return this.data
        .filter((row) =>
          Object.values(row)
            .slice(0, 5)
            .some((field) =>
              field
                .toString()
                .toLowerCase()
                .includes(this.search)
            )
        )
        .sort((row_a, row_b) => {
          const a = row_a[this.sortColumn];
          const b = row_b[this.sortColumn];
          let cmp = typeof a === "number" ? a - b : a.localeCompare(b);
          return this.sortAscending ? cmp : -cmp;
        });
    },
    currentPage() {
      const from = (this.page - 1) * this.perPage;
      const to = from + this.perPage;
      return this.filtered.slice(from, to);
    },
  },
  methods: {
    sort(columnName) {
      if (columnName === this.sortColumn) {
        this.sortAscending = !this.sortAscending;
        return;
      }
      this.page = 1;
      this.sortColumn = columnName;
      this.sortAscending = true;
    },
    filter() {
      this.page = 1;
      this.search = this.searchInput;
    },

    showUserInfo(row) {
      if (this.selectedRow && this.selectedRow.id == row.id)
        this.selectedRow = {};
      else this.selectedRow = row;
    },
  },
};
</script>
