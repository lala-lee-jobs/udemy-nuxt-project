<template>
    <section class="post-list">
        <PostPreview 
            id="1"
            :is-admin="isAdmin" 
            thumbnail="https://lorempixel.com/400/200/cats/1" 
            title="First" 
            previewText="First post"/>
        <PostPreview 
            id="2" 
            :is-admin="isAdmin" 
            thumbnail="https://lorempixel.com/400/200/cats/2" 
            title="Second" 
            previewText="Second post"/>
        <PostPreview 
            id="3" 
            :is-admin="isAdmin" 
            thumbnail="https://lorempixel.com/400/200/cats/3" 
            title="Third" 
            previewText="Third post"/>
    </section> 
</template>
<script>
import PostPreview from '@/components/Posts/PostPreview';
export default {
    components: {
        PostPreview,
    },
    props: {
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
};
</script>
<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
