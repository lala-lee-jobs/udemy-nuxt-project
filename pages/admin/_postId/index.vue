<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost"/>
        </section>
    </div>
</template>
<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
  layout:'admin',
  components: {
      AdminPostForm
  },
  asyncData(context) {
    const { postId } = context.params;
    return axios
      .get(`https://udemy-nuxt-demo.firebaseio.com/posts/${postId}.json`)
      .then((res) => {
        return {
          loadedPost : res.data,
        };
      }).catch(e => context.error(e));
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
