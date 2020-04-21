import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null,
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
            setToken(state, token) {
              state.token = token;
            },
            clearToken(state) {
              state.token = null;
            }
        },
        actions: {
            nuxtServerInit(vueContext, context) {
              return context.app.$axios.$get(`/posts.json`)
                .then(data => {
                  const postsArray = [];
                  for(const key in data) {
                    postsArray.push({ ...data[key], id: key });
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
              const { token } = vueContext.state;
              return this.$axios.$post(`/posts.json?auth=${token}`, createdPost)
              .then(data => {
                vueContext.commit('addPost', {...createdPost, id: data.name});
              })
              .catch(e => console.log(e));
            },
            editPost(vueContext, editedPost) {
              const { token } = vueContext.state;
              return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${token}`, editedPost)
              .then(data => {
                vueContext.commit('editPost', editedPost);
              })
              .catch(e => console.log(e));
            },
            authenticateUser(vueContext, authData) {
              // https://firebase.google.com/docs/reference/rest/auth
              let authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
              if(!authData.isLogin) {
                authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
              }
              return this.$axios.$post(authURL, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
              }).then((result) => {
                const { idToken } = result;
                vueContext.commit('setToken', idToken);
                localStorage.setItem('token', idToken);
                localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn * 1000);
                vueContext.dispatch('setLogoutTimer', result.expiresIn * 1000);
              }).catch((e) => {
                console.log(e);
              });
            },
            setLogoutTimer(vueContext, duration) {
              setTimeout(() => {
                vueContext.commit('clearToken');
              }, duration);
            },
            initAuth(vueContext) {
              const token = localStorage.getItem('token');
              const expirationDate = localStorage.getItem('tokenExpiration');
              if (new Date() > expirationDate || !token) {
                return;
              }
              vueContext.commit('setToken', token);
            }
        },
        getters: {
            loadedPosts(state) {
              return state.loadedPosts;
            },
            isAuthenticated(state) {
              return state.token != null;
            },
        },
    });
};

export default createStore;
