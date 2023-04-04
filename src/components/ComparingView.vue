<template>
    <div v-if="comicsCharacters?.image?.length>1">
        <table class="table table-dark table-striped">
            <colgroup>
                <col span="1" style="width:200px;">
                <col :span="comicsCharacters?.image?.length - 1" style="width:200px;">
            </colgroup>
            <tbody>
                <template v-for="(values, key) in comicsCharacters" :key="key">

                    <tr v-if="key === 'image'">
                        <td v-for="(value, index) in values" :key="index">
                            <img loading="lazy" v-if="value" class="img-responsive rounded" :src="value"
                                style="max-width: 100%; max-height: 27.5rem;">
                        </td>
                    </tr>

                    <tr v-else-if="key === 'text'" v-for="(tds, index) in values" :key="index">
                        <td v-for="(value, index) in tds" :key="index">
                            {{ value }}
                        </td>
                    </tr>
                    <tr v-else-if="key === 'progressBar'" v-for="(tds, indexs) in values" :key="indexs">
                        <td v-for="(value, index) in tds" :key="index">
                            <div v-if="index === 0">
                                {{ value }}
                            </div>
                            <div v-else>
                                <div class="progress">
                                    <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                        :style="{ width: `${value}%` }">{{ value }}%</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>


    </div>
</template>

<script>
import { ref } from 'vue'
import api from '../ApiHandling.js'

export default {
    name: 'CharacterCompareView',
    props: {
        compareIDs: String
    },
    data() {
        return {
            comicsCharacters: ref({})
        }
    },
    async mounted() {
        this.comicsCharacters = {
            image: [" "],
            text: {
                name: ["Character Name"],
                publisher: ["Publisher"],
                fullName: ["Full Name"],
                alignment: ["Alignment"],
                firstAppearance: ["First Appearance"],
                occupation: ["Occupation"],
                comics: ["Comics"],
                groupAffiliation: ["Group Affiliation Comics"],
            },
            progressBar: {
                combat: ["Combat"],
                durability: ["Durability"],
                intelligence: ["Intelligence"],
                power: ["Power"],
                speed: ["Speed"],
                strength: ["Strength"]
            }
        };

        let characters = await this.comicCharacters();
        characters.forEach((comicsCharacter) => {
            this.comicsCharacters.image.push(comicsCharacter.images.md);

            this.comicsCharacters.text.name.push(comicsCharacter.name);
            this.comicsCharacters.text.publisher.push(comicsCharacter.biography.publisher);
            this.comicsCharacters.text.fullName.push(comicsCharacter.biography.fullName);
            this.comicsCharacters.text.alignment.push(comicsCharacter.biography.alignment);
            this.comicsCharacters.text.firstAppearance.push(comicsCharacter.biography.firstAppearance);
            this.comicsCharacters.text.occupation.push(comicsCharacter.work.occupation);
            this.comicsCharacters.text.comics.push(comicsCharacter.biography.aliases.join(", "));
            this.comicsCharacters.text.groupAffiliation.push(comicsCharacter.connections.groupAffiliation);

            this.comicsCharacters.progressBar.combat.push(comicsCharacter.powerstats.combat);
            this.comicsCharacters.progressBar.durability.push(comicsCharacter.powerstats.durability);
            this.comicsCharacters.progressBar.intelligence.push(comicsCharacter.powerstats.intelligence);
            this.comicsCharacters.progressBar.power.push(comicsCharacter.powerstats.power);
            this.comicsCharacters.progressBar.speed.push(comicsCharacter.powerstats.speed);
            this.comicsCharacters.progressBar.strength.push(comicsCharacter.powerstats.strength);

        });

    },
    methods: {
        async comicCharacters() {
            const ids = this.$route.query.compareIDs.split(",");
            let returnData = [];
            for (let i = 0; i < ids.length; i++) {
                const data = await api.getById(ids[i]);
                returnData.push(data);
            }
            return returnData;
        }
    },
}
</script>
