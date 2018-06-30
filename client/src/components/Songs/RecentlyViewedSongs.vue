<template>
    <panel title="Recently Viewed Songs">
        <div slot="content">
            <v-data-table
                    :headers="headers"
                    :pagination.sync="pagination"
                    :items="songs"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-right">{{ props.item.title }} </td>
                    <td class="text-xs-right">{{ props.item.artist }}</td>
                </template>
            </v-data-table>
        </div>
    </panel>
</template>

<script>
    import {mapState} from 'vuex'
    import SongHistoryService from '@/services/SongHistoryService'

    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'Title',
                        value: 'title'
                    },
                    {
                        text: 'Artist',
                        value: 'artist'
                    }
                ],
                pagination: {
                    sortBy: 'createdAt',
                    descending: true
                },
                songs: []
            }
        },
        async mounted() {
            if(this.isUserLoggedIn) {
                this.songs = (await SongHistoryService.index()).data;
            }
        },
        computed: {
            ...mapState([
                'isUserLoggedIn',
                'user'
            ])
        }
    }
</script>
<style scoped>

</style>
