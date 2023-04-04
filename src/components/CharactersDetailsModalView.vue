<template>
    <Transition name="comicsDetailsModalView">
        <div v-if="show" class="modal-mask">
            <div class="modal-dialog modal-lg modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Comic Character Details</h3>
                        <button type="button" class="close" @click="$emit('close')" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="m-0 modal-body p-0">
                        <CharacterDetailsCardView :character="charactersDetails" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import api from '../ApiHandling.js'
import CharacterDetailsCardView from './CharacterDetails.vue'

export default {
    components: {
        CharacterDetailsCardView
    },
    data() {
        return {
            charactersDetails: {}
        }
    },
    watch: {
        async characterId() {
            if (this.characterId) {
                this.charactersDetails = await this.comicCharacters();
            }
        }
    },
    props: {
        show: Boolean,
        characterId: String
    },
    methods: {
        async comicCharacters() {
            const data = await api.getById(this.characterId);
            return data;
        }
    },
}
</script>
