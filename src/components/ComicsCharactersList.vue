<template>
     <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <CharactersDetailsModalView :show="showModal" :characterId="comicId" @close="showModal = false" />
          <div id="compareDiv">
               <router-link :to="{ path:'compare', query:{'compareIDs':compareCharacterIDs.toString()}}" v-show="showCompareBtn" class="compare btn btn-secondary">
                    Compare {{compareCharacterIDs.length}}
               </router-link>
          </div>
     </Teleport>

     <Teleport to="#serachDiv">
          <div class="form-row">
               <div class="col">
                    <input class="form-control" v-model="characterName" @keyup="applyFilter($event)" type="text"
                         placeholder="Search Character By Name">
               </div>
               <div class="col">
                    <select class="custom-select" @change="applyFilter($event)" v-model="publisherName">
                         <option v-for="(publisher) in publishers" :key="publisher" :value="publisher">{{ publisher }}
                         </option>
                    </select>
               </div>
               <div class="col">
                    <button class="btn btn-light" @click="resetFilter()">Reset filter</button>
               </div>
          </div>
     </Teleport>

     <div class="container" style="display: flex;flex-wrap: wrap;">
          <div class="mr-auto mt-4" v-for="character in charactersList" :key="character.id">
               <div class="card " style="width:250px">
                    <img class="card-img-top" loading="lazy" :src="character.images.sm" :alt="character.name"
                         style="width:100%">
                    <div class="card-body">
                         <h4 class="card-title">{{ character.name }}</h4>
                         <p class="card-text ellipse two-lines">{{ character.work.occupation }}</p>
                         <button :id="character.id" @click="openModal" class="btn btn-primary">More...</button>

                         <div class="btn btn-secondary comparebtnDiv mt-2">
                              <input class="compareInput" type="checkbox" :id="character.id + (`-compare`)" :value="character.id"
                                   v-model="compareCharacterIDs">
                              <label class="mb-0 ml-2" :for="character.id + (`-compare`)">Add to Compare</label>
                         </div>

                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import { ref } from 'vue'
import api from '../ApiHandling.js'
import CharactersDetailsModalView from './CharactersDetailsModalView.vue'
import $ from 'jquery'
import { routes } from '../router.js'

export default {
     name: 'LIST',
     components: {
          CharactersDetailsModalView
     },
     async mounted() {
          this.allCharactersList = await this.comicCharacters();
          this.charactersList = this.allCharactersList;
     },
     watch: {
          allCharactersList() {
               this.charactersList = this.allCharactersList;
          },
          compareCharacterIDs(){
               if(this.compareCharacterIDs && this.compareCharacterIDs.length > 1){
                    this.showCompareBtn = true;
                    if(this.compareCharacterIDs.length > 3){
                         $('.comparebtnDiv:has(.compareInput:not(:checked))').hide();
                    }else{
                         $(".comparebtnDiv").show();
                    }
               }
               else{
                    this.showCompareBtn = false;
                    $(".comparebtnDiv").show();
               }
          }
     },
     data() {
          return {
               navPath: routes,
               showModal: false,
               characterName: undefined,
               publisherName: "All",
               showCompareBtn:false,
               compareCharacterIDs: ref([]),
               publishers: { "all": "All" },
               comicId: undefined,
               charactersList: []
          }
     },
     methods: {
          resetFilter() {
               this.characterName = undefined;
               this.publisherName = "All";
               this.applyFilter();
          },
          openModal(e) {
               this.comicId = e.target.id;
               this.showModal = true;
          },
          applyFilter(event) {
               let val = event?.target?.value;
               var publisherName = this.publisherName;
               var characterName = this.characterName;

               function condition(character) {
                    let filter = true;
                    if (publisherName != "All" && character.biography.publisher) {
                         filter = character.biography.publisher.toLowerCase().trim().indexOf(publisherName.toLowerCase().trim()) !== -1;
                    }
                    if (filter && characterName) {
                         filter = character.name.toLowerCase().trim().indexOf(characterName.toLowerCase().trim()) !== -1;
                    }
                    val = val == val;
                    return filter;
               }
               this.charactersList = this.allCharactersList.filter(condition);
          },
          async comicCharacters() {
               const data = await api.getALL();
               data.forEach((value) => {
                    // preparing filers data
                    if (value.biography.publisher) {
                         this.publishers[value.biography.publisher.trim().toLowerCase()] = value.biography.publisher;
                    }
               });
               return data;
          }
     },
}
</script>