<template>
    <div class="col-full push-top">
        <h1>
            Create new thread in <i>{{ forum.name }}</i>
        </h1>

        <ThreadEditor @save="save" @cancel="cancel" />
    </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'

export default {
    components: { ThreadEditor },
    props: {
        forumId: { type: String, required: true }
    },
    computed: {
        forum() {
            return this.$store.state.forums.find(forum => forum.id === this.forumId)
        }
    },
    data() {
        return {
            title: '',
            text: ''
        }
    },
    methods: {
        async save({ title, text }) {
            const thread = await this.$store.dispatch('createThread', {
                forumId: this.forum.id,
                title,
                text
            })
            this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
        },
        cancel() {
            this.$router.push({ name: 'Forum', params: { id: this.forum.id } })
        }
    }
}
</script>