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
        },
        actions: {
            nuxtServerInit(vueContext, context) {
              return axios.get('https://udemy-nuxt-demo.firebaseio.com/posts.json')
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
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
        },
    });
};

export default createStore;
