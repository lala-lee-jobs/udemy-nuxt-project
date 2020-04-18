<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost"/>
        </section>
    </div>
</template>
<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  components: {
      AdminPostForm
  },
  data() {
      return {
          loadedPost: {
              author: 'lala',
              title: 'My awesome post',
              content : 'lorem text',
              thumbnailLink: 'https://lorempixel.com/400/200/cats/4',
          },
      };
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