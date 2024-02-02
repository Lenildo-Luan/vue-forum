<template>
    <div class="col-large push-top">
        <h1>{{ thread.title }}</h1>

        <post-list :posts="threadPosts" />

        <post-editor @save="addPost" />
    </div>
</template>
  
<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
    name: 'ThreadShow',
    components: {
        PostList,
        PostEditor
    },
    props: {
        id: {
            required: true,
            type: String
        }
    },
    computed: {
        threads() {
            return this.$store.state.threads
        },
        posts() {
            return this.$store.state.posts
        },
        thread() {
            return this.threads.find(thread => thread.id === this.id) // also available under this.$route.params.id
        },
        threadPosts() {
            return this.posts.filter(post => post.threadId === this.id)
        }
    },
    methods: {
        addPost(eventData) {
            const postId = 'ggqq' + Math.random()
            const post = {
                ...eventData.post,
                threadId: this.id,
                id: postId,
                text: this.newPostText,
                publishedAt: Math.floor(Date.now() / 1000),
                userId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
            }
            this.posts.push(post)
            this.thread.posts.push(post.id)
            this.newPostText = ''
        }
    }
}
</script>