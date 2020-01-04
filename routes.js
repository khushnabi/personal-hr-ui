import User from './components/condidate/User.vue';
import Create from "./components/Create.vue";
import Home from "./components/Home";
import UserDetail from "./components/condidate/UserDetail";
import UserEdit from "./components/condidate/UserEdit";
import UserView from "./components/condidate/UserView";
import Vacancy from "./components/vacancy/Vacancy";
import CreateVacancy from "./components/vacancy/CreateVacany.vue";
import vacancyView from "./components/vacancy/vacancyView.vue";
import VacansyQues from "./components/vacancy/VacancyQues.vue";


export const routes = [
    { path: '/', component: Home},
    { path: '/create-vacancy', component: CreateVacancy },
    { path: '/vacancy', component: Vacancy, children:[
        {path: '', component: vacancyView},
        {path: ':id/question', component: VacansyQues},
        {path : ':id/edit', component: CreateVacancy}
    ] },
    {  path: '/users', component: User, children: [
        { path: '', component:UserView},
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component:UserEdit }
    ]},
    { path: '/create', component: Create, children:[
        { path: ':id', component: Create }
    ]}
];