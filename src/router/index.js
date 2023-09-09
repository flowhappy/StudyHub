import VueRouter from "vue-router";
import ContentPage from "@/components/ContentPage.vue";
import WelcomeStuHub from "@/components/WelcomeStuHub.vue";
import CompilePush from "@/components/CompilePush.vue";
import ArticlePage from "@/components/ArticlePage.vue";
import ManagePage from "@/components/ManagePage.vue";
import ChangeUserName from "@/components/ChangeUserName.vue";
import ChangeUserArticle from "@/components/ChangeUserArticle.vue";
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
            path:'/ManagePage',
            component:ManagePage,
            redirect:'/ChangeUserName',
            children:[
                {path: '/ChangeUserName', component: ChangeUserName},
                {path: '/ChangeUserArticle', component: ChangeUserArticle}
            ]
        }
    ]
})