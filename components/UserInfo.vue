<template>
  <div v-show="selectedRow && Object.keys(selectedRow).length > 0" class="box">
    <div class="content">
      <p>
        Выбран пользователь: <b> {{ selectedRow.firstName }} </b>
      </p>
      <form>
        <label for="user-info">Описание:</label>
        <textarea
          id="user-info"
          name="user-info"
          rows="4"
          v-model="selectedRow.description"
        >
        </textarea>
      </form>
      <p>
        Адрес проживания: <b> {{ selectedRow.address.streetAddress }} </b>
      </p>
      <p>
        Город: <b> {{ selectedRow.address.city }} </b>
      </p>
      <p>
        Провинция/штат: <b> {{ selectedRow.address.state }} </b>
      </p>
      <p>
        Индекс: <b> {{ selectedRow.address.zip }} </b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedRow: Object,
  },
};
</script>
<style scoped>
form > label {
  vertical-align: top;
}
</style>
