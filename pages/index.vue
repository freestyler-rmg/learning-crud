<template>
  <div class="main-container">
    <section class="add-item">
      <p class="mb-1.5 text-xs">Add new item:</p>
      <div class="input-container">
        <input v-model="input" type="text" class="rounded-sm text-sm p-1.5" />
        <button :disabled="disable" class="rounded-sm text-sm p-1.5" @click="handleCreate">➕</button>
      </div>
    </section>

    <section class="checkbox-container">
      <div v-if="!list" class="no-data">
        ¡datos no disponibles, jefe!
      </div>
      <ul>
        <li v-for="item in list" :key="item.id">
          <textarea v-if="item.edit" v-model="item.description" type="text" />
          <p v-else>
            {{ item.description }}
          </p>
          <p class="date">
            {{ item.created }} <span v-if="item.updated">(Last update: {{ item.updated }})</span>
          </p>
          <div class="button-container">
            <template v-if="item.edit">
              <button class="rounded-sm text-sm p-1.5" @click="handleUpdate(item.id, item.description)">💾</button>
              <button class="rounded-sm text-sm p-1.5" @click="item.edit = false">❌</button>
            </template>
            <template v-else>
              <button class="rounded-sm text-sm p-1.5" @click="item.edit = true">✏️</button>
              <button class="rounded-sm text-sm p-1.5" @click="handleDelete(item.id)">🗑️</button>
            </template>
          </div>
        </li>
      </ul>
    </section>

    <div v-if="loading" class="loading">
      <div class="inner-container">
        <div class="icon">💿</div>
        <p>loading...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs';

export default Vue.extend({
  name: 'CRUD',

  data() {
    return {
      loading: false,
      input: '',
      list: []
    }
***REMOVED***

  computed: {
    disable(): boolean {
      return this.input.length === 0;
    }
***REMOVED***

  created() {
    this.loading = true;
    this.handleRead();
***REMOVED***

  methods: {
    async handleCreate() {
      await this.$axios
        .post(`http://localhost:3069/api/create`, {
          description: this.input
        })
        .then(() => {
          this.input = '';
          this.loading = true;
          this.handleRead();
        })
        .catch(error => console.error(error));
  ***REMOVED***

    async handleRead() {
      await this.$axios
        .get(`http://localhost:3069/api/read`)
        .then(response => {
          const data = response.data;
          this.list = data.list.map(
            (item: {
              _id: string;
              description: string;
              created: Date;
              updated: Date|null;
              edit: Boolean;
            }) => ({
              id: item._id,
              description: item.description,
              created: dayjs(item.created).format('DD MMM YYYY HH:mm'),
              updated: item.updated ? dayjs(item.updated).format('DD MMM YYYY HH:mm') : null,
              edit: false
            })
          );
          this.loading = false;
        })
        .catch(error => console.error(error));
  ***REMOVED***

    async handleUpdate(id: string, desc: string) {
      await this.$axios
        .put(`http://localhost:3069/api/update/${id}`, {
          description: desc
        })
        .then(() => {
          this.loading = true;
          this.handleRead();
        })
        .catch(error => console.error(error));
  ***REMOVED***

    async handleDelete(id: string) {
      await this.$axios
        .delete(`http://localhost:3069/api/delete/${id}`)
        .then(() => {
          this.loading = true;
          this.handleRead();
        })
        .catch(error => console.error(error));
  ***REMOVED***

  }
***REMOVED***
</script>

<style src="./style.scss" lang="scss" scoped />
