import Vuex from 'vuex';

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
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      vueContext.commit('setPosts',[
                          { id: '1', title: 'Post One', previewText: 'Post 1', thumbnail: 'https://lorempixel.com/400/200/cats/1'},
                          { id: '2', title: 'Post Two', previewText: 'Post 2', thumbnail: 'https://lorempixel.com/400/200/cats/2'},
                          { id: '3', title: 'Post Three', previewText: 'Post 3', thumbnail: 'https://lorempixel.com/400/200/cats/3'},
                      ]);
                      resolve();
                    }, 1000);                   
                });
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