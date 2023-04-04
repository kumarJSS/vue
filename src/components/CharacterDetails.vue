<template>
     <div class="" v-if="show">
          <div class="row card-body pb-0">
               <div class="col-md-4 pt-3" style="text-align: center;">
                    <img loading="lazy" class="img-responsive rounded" :src="comicsCharacter.images.md"
                         :alt="comicsCharacter.name" style="max-width: 100%; max-height: 27.5rem;">
               </div>
               <div class="col-md-8 pt-3">
                    <table class="table table-dark table-striped">
                         <tbody>
                              <tr>
                                   <td colspan="2" style="text-align: center;font-size: 1.3rem;font-weight: 900;">Biography
                                   </td>
                              </tr>

                              <tr>
                                   <td style="width: 37%;">Character Name</td>
                                   <td>{{ comicsCharacter.name }}</td>
                              </tr>
                              <tr>
                                   <td>Publisher</td>
                                   <td>{{ comicsCharacter.biography.publisher }}</td>
                              </tr>
                              <tr>
                                   <td>Full Name</td>
                                   <td>{{ comicsCharacter.biography.fullName }}</td>
                              </tr>
                              <tr>
                                   <td>Alignment</td>
                                   <td>{{ comicsCharacter.biography.alignment }}</td>
                              </tr>
                              <tr>
                                   <td>First Appearance</td>
                                   <td>{{ comicsCharacter.biography.firstAppearance }}</td>
                              </tr>
                              <tr>
                                   <td>Occupation</td>
                                   <td> {{ comicsCharacter.work.occupation }}</td>
                              </tr>
                              <tr>
                                   <td>Comics</td>
                                   <td>{{ comicsCharacter.biography.aliases.join(", ") }}</td>
                              </tr>
                              <tr>
                                   <td>Group Affiliation Comics</td>
                                   <td> {{ comicsCharacter.connections.groupAffiliation }}</td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
          <div class="row card-body pt-0">
               <div class="col-sm-12 pt-0" style="text-align: center;">
                    <table class="table table-dark table-striped">
                         <tbody>
                              <tr>
                                   <td colspan="2" style="text-align: center;font-size: 1.3rem;font-weight: 900;">Power Stats
                                   </td>
                              </tr>

                              <tr>
                                   <td style="width: 25%;">Combat</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.combat}%` }">{{
                                                       comicsCharacter.powerstats.combat }}%</div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <td>Durability</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.durability}%` }">{{
                                                       comicsCharacter.powerstats.durability }}%</div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <td>Intelligence</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.intelligence}%` }">{{
                                                       comicsCharacter.powerstats.intelligence }}%</div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <td>Power</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.power}%` }">{{
                                                       comicsCharacter.powerstats.power }}%</div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <td>Speed</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.speed}%` }">{{
                                                       comicsCharacter.powerstats.speed }}%</div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <td>Strength</td>
                                   <td>
                                        <div class="progress">
                                             <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                                  :style="{ width: `${comicsCharacter.powerstats.strength}%` }">{{
                                                       comicsCharacter.powerstats.strength }}%</div>
                                        </div>
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     </div>
</template>

<script>
// import api from '../ApiHandling.js'

export default {
     name: 'CharacterDetailsCardView',
     props: {
          character: Object
     },
     data() {
          return {
               comicsCharacter: undefined,
               // id: this. $route.params.id,
               show: false
          }
     },
     watch: {
          character() {
               this.comicsCharacter = this.character;
               this.show = true;
               console.log(this.show);
          },
          // comicsCharacter() {
          //      this.show = this.comicsCharacter !== undefined;
          // }
     },

     async mounted() {
          if(this.character){
               this.comicsCharacter = this.character;
               this.show = true;
          }
          // this.comicsCharacter = await this.comicCharacters();
     },
     // methods: {
     //      async comicCharacters() {
     //           const data = await api.getById(346);
     //           return data;
     //      }
     // },
}
</script>
