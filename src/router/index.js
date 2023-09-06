import VueRouter from "vue-router";
import ContentPage from "@/components/ContentPage.vue";
import WelcomeStuHub from "@/components/WelcomeStuHub.vue";
import CompilePush from "@/components/CompilePush.vue";
import ArticlePage from "@/components/ArticlePage.vue";
import ClassPage from "@/components/ClassPage.vue";
export default new  VueRouter({
    routes:[
        {
          path:'/',
          component:WelcomeStuHub
        },
        {
            path:'/ContentPage',
            component:ContentPage
        },
        {
            path:'/CompilePush',
            component:CompilePush
        },
        {
            path:'/ArticlePage/:article',
            component:ArticlePage,
            name:'ArticlePage'
        },
        {
            path:'/ClassPage',
            component:ClassPage
        }
    ]
})