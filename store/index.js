import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
              state.loadedPosts.push(post);
            },

            editPost(state, editedPost) {
              const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
              state.loadedPosts[postIndex] = editedPost;
            },
        },
        actions: {
            nuxtServerInit(vueContext, context) {
              return axios.get(`${process.env.baseUrl}/posts.json`)
                .then(res => {
                  const postsArray = [];
                  for(const key in res.data) {
                    postsArray.push({ ...res.data[key], id: key });
                  }
                  vueContext.commit('setPosts', postsArray);
                })
                .catch(e => context.error(e));
            },
            setPosts(vueContext, posts) {
                vueContext.commit('setPosts', posts);
            },
            addPost(vueContext, post) {
              const createdPost = {
                ...post,
                updatedDate: new Date(),
              };
              return axios.post(`${process.env.baseUrl}/posts.json`, createdPost)
              .then(res => {
                vueContext.commit('addPost', {...createdPost, id: res.data.name});
              })
              .catch(e => console.log(e));
            },
            editPost(vueContext, editedPost) {
              return axios.put(`${process.env.baseUrl}/posts/${editedPost.id}.json`, editedPost)
              .then(res => {
                vueContext.commit('editPost', editedPost);
              })
              .catch(e => console.log(e));
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
        },
    });
};

export default createStore;
