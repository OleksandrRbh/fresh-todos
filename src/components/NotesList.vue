<template>
  <div class="layout pa-3 justify-center">
    <div class="flex xs8">
      <v-data-table
        :headers="headers"
        :items="notes"          
        hide-default-footer
        class="elevation-1"
      >          
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2" 
            icon 
            x-large 
            color="blue"
            @click="goToEditNote(item.id)"
          >
            <v-icon medium>mdi-pencil</v-icon>
          </v-btn>
          <v-btn 
            class="ma-2"
            icon 
            x-large 
            color="deep-orange"
            @click="openDialog(item.id)"
          >
            <v-icon medium>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-slot:no-data>
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
        </template>
      </v-data-table>      
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
      deletedId: null,
      headers: [
        { text: 'Id', value: 'id', sortable: false, },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false, },
      ]
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
  .v-data-table td {
    padding: 0 24px;
  }

  .v-alert {
    margin-bottom: 0;
    margin: 4px auto;
  }
</style>