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
    asyncData(context, callback) {
      setTimeout(() => {
        callback(null, {
          loadedPosts:[
            { id: '1', title: 'Post 1', previewText: 'Post 1', thumbnail: 'https://lorempixel.com/400/200/cats/1'},
            { id: '2', title: 'Post 2', previewText: 'Post 2', thumbnail: 'https://lorempixel.com/400/200/cats/2'},
            { id: '3', title: 'Post 3', previewText: 'Post 3', thumbnail: 'https://lorempixel.com/400/200/cats/3'},
          ]
        });        
      }, 1000);
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