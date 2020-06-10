<template>
  <div class="layout pa-3 justify-center">    
    <div class="flex xs8">
      <v-card>
        <v-card-title class="headline p-16">Create item</v-card-title>
        <v-card-text class="p-16">
          <v-form          
            @submit="addNote"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"      
          >
            <v-text-field
              v-model="noteParams.name"        
              :rules="requiredRules"
              label="Name"
              required
            ></v-text-field>

            <v-textarea
              v-model="noteParams.description"
              :rules="requiredRules"        
              label="Description"
              rows="5"
              required
            ></v-textarea>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn
                text
                color="error"
                @click="cancel"                  
              >Cancel</v-btn>       

              <v-btn 
                text 
                color="primary"
                type="submit"
              >Save</v-btn>      
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import {mapState ,mapGetters} from "vuex";

export default {
  data: () => ({
    id: null,
    noteParams: null,
    requiredRules: [
      v => !!v || 'This field is required',      
    ],             
    valid: true,
    lazy: false
  }),
  
  computed: {
    ...mapState({
      state: (state) => state.notes
    }),
    ...mapGetters({
      note: `getNote`
    }),
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    cancel () {
      this.$router.push({name: 'notes'})
    },  
    addNote() {
      if (this.$refs.form.validate() === true) {
        if (this.$route.params.id || this.$route.params.id === 0) {
          this.$store.dispatch("UPDATE_NOTE", {index: this.id, note: this.noteParams});
        } else  {
          this.noteParams.id = Date.now();
          this.$store.dispatch("SET_NOTE", this.noteParams);
        }
        this.$router.push("/");
      }        
    }    
  },
  created() {
    this.id = this.$route.params.id
    this.noteParams = Object.assign({}, this.note(this.id));                 
  },
  mounted() { 
           
  },
}
</script>

<style>

</style>