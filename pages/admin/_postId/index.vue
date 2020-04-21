<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
        </section>
    </div>
</template>
<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  layout:'admin',
  middleware: ['auth', 'check-auth'],
  components: {
      AdminPostForm
  },
  asyncData(context) {
    const { postId } = context.params;
    return context.app.$axios
      .$get(`/posts/${postId}.json`)
      .then((data) => {
        return {
          loadedPost : {...data, id: postId},
        };
      }).catch(e => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost).then(() => {
        this.$router.push('/admin');
      });
    }
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media screen {
  .update-form {
    width: 500px;
  }
}
</style>
