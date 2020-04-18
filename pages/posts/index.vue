<template>
    <div class="posts-page">
        <PostList :posts="loadedPosts"/>
    </div>
</template>
<script>
import PostList from '@/components/Posts/PostList';
export default {
    components: {
        PostList,
    },
    asyncData(context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            loadedPosts:[
              { id: '1', title: 'Post One', previewText: 'Post 1', thumbnail: 'https://lorempixel.com/400/200/cats/1'},
              { id: '2', title: 'Post Two', previewText: 'Post 2', thumbnail: 'https://lorempixel.com/400/200/cats/2'},
              { id: '3', title: 'Post Three', previewText: 'Post 3', thumbnail: 'https://lorempixel.com/400/200/cats/3'},
            ]
          });
        // reject(new Error());        
        }, 1000);
      }).then((data) => {
          return data;
      }).catch((error) => {
          context.error(error);
      });
    },
};
</script>
<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>