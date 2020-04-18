<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton  @click="onCreate">Create Post</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Existing Posts</h1>
            <PostList isAdmin/>
        </section>
    </div>
</template>
<script>
import PostList from '@/components/Posts/PostList';
import AppButton from '@/components/UI/AppButton';

export default {
    components: {
        PostList,
        AppButton,
    },
    methods: {
      onCreate() {
        this.$router.push('/admin/new-post');
      },
    },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>