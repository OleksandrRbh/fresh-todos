<template>
  <div class="layout pa-3 justify-center">
    <div class="flex xs8">
      <div class="elevation-1">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Id</th>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in notes" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>

                  <v-btn 
                    icon 
                    x-large 
                    color="blue"
                    @click="goToEditNote(item.id)"
                  >
                    <v-icon medium>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn 
                    icon 
                    x-large 
                    color="deep-orange"
                    @click="openDialog(item.id)"
                  >
                    <v-icon medium>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="notes.length === 0">
                <td colspan="4">
                  <v-alert 
                    type="error"
                    icon="mdi-alert"
                    dark                
                    color="red"
                    border="top"                
                    tile
                  >
                    Sorry, nothing to display here :(
                  </v-alert>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="text-xs-center pt-2">
        <router-link :to="{name: 'notes-new'}">
          <v-btn color="primary">Create new item</v-btn>
        </router-link>      
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">Do you really want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>          
          <v-btn
            text
            color="error"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn 
            text 
            color="primary"
            @click="deleteNote"
          >Delete</v-btn> 
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {      
      dialog: false,
      deletedId: null
    }
  },
  computed: {
    ...mapState({
      notes: (state) => state.notes
    })
  },
  methods: {
    openDialog(id) {
      this.deletedId = id;      
      this.dialog = true;
      console.log(this.deletedId);
      
    },
    deleteNote() {
      this.dialog = false;
      this.$store.dispatch("DELETE_NOTE", this.deletedId);      
    },
    goToEditNote(index) {
      this.$router.push({ name: 'notes-edit', params: {id: index} });
    }
  }
}
</script>

<style lang="scss" scoped> 
  .v-alert {
    margin-bottom: 0;
    margin: 4px auto;
  }
</style>