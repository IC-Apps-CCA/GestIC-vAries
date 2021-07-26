import Dashboard from '../pages/Dashboard';
import ProjetosAtivos from '../pages/ProjetosAtivos';
import ActiveProjectItemPage from '../pages/ProjetosAtivos/Project';
import { GruposPesquisaItemPage, GruposPesquisaList, GruposPesquisaNewEdit } from '../pages/GruposPesquisa';
import { InformativeItemPage, InformativeList, InformativeNewEdit } from '../pages/Informative';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword';
import { UsefulInformationsPage, EmailListPage } from '../pages/UsefulInformations';
import { Calendar, EventItemPage, EventList, EventNewEdit } from '../pages/Calendar';
import CourseOffers from '../pages/CourseOffers';
import CourseOffersShow from '../pages/CourseOffers/OfferShow';
import OfferNewEdit from '../pages/CourseOffers/OfferNewEdit';

export const routes = [
  {
    path: '/',
    component: Dashboard,
    private: false,
    roles: [],
  },
  {
    path: '/login',
    component: SignIn,
    private: false,
    roles: [],
  },
  {
    path: '/ofertas-disciplinas',
    component: CourseOffers,
    private: false,
    roles: [],
  },
  {
    path: '/ofertas-disciplinas/show/:id',
    component: CourseOffersShow,
    private: false,
    roles: [],
  },
  {
    path: '/ofertas-disciplinas/edit/:id',
    component: OfferNewEdit,
    private: true,
    roles: [],
  },
  {
    path: '/ofertas-disciplinas/new',
    component: OfferNewEdit,
    private: true,
    roles: [],
  },
  {
    path: '/projetos-ativos',
    component: ProjetosAtivos,
    private: false,
    roles: [],
  },
  {
    path: '/projetos-ativos/show/:id',
    component: ActiveProjectItemPage,
    private: false,
    roles: [],
  },
  {
    path: '/projetos-ativos/new',
    private: true,
    roles: [],
  },
  {
    path: '/informativos',
    component: InformativeList,
    private: false,
    roles: [],
  },
  {
    path: '/informativos/show/:id',
    component: InformativeItemPage,
    private: false,
    roles: [],
  },
  {
    path: '/informativos/new',
    component: InformativeNewEdit,
    private: true,
    roles: [],
  },
  {
    path: '/informativos/edit/:id',
    component: InformativeNewEdit,
    private: true,
    roles: [],
  },
  {
    path: '/grupos-de-pesquisa',
    component: GruposPesquisaList,
    private: false,
    roles: [],
  },
  {
    path: '/grupos-de-pesquisa',
    component: GruposPesquisaList,
    private: false,
    roles: [],
  },
  {
    path: '/grupos-de-pesquisa/new',
    component: GruposPesquisaNewEdit,
    private: false,
    roles: [],
  },
  {
    path: '/grupos-de-pesquisa/edit/:id',
    component: GruposPesquisaNewEdit,
    private: false,
    roles: [],
  },
  {
    path: '/grupos-de-pesquisa/show/:id',
    component: GruposPesquisaItemPage,
    private: false,
    roles: [],
  },
  {
    path: '/register',
    component: SignUp,
    private: false,
    roles: [],
  },
  {
    path: '/perfil',
    component: Profile,
    private: true,
    roles: [],
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    private: false,
    roles: [],
  },
  {
    path: '/informacoes-uteis',
    component: UsefulInformationsPage,
    private: false,
    roles: [],
  },
  {
    path: '/informacoes-uteis/lista-emails',
    component: EmailListPage,
    private: false,
    roles: [],
  },
  {
    path: '/calendario',
    component: Calendar,
    private: false,
    roles: [],
  },
  {
    path: '/eventos/new',
    component: EventNewEdit,
    // private: true,
    roles: [],
  },
  {
    path: '/eventos/edit/:id',
    component: EventNewEdit,
    // private: true,
    roles: [],
  },
  {
    path: '/eventos',
    component: EventList,
    private: false,
    roles: [],
  },
  {
    path: '/eventos/show/:id',
    component: EventItemPage,
    private: false,
    roles: [],
  },
  // {
  //   path: '/admin',
  //   component: AdminPage,
  //   private: true,
  //   roles: ['admin']
  // },
];
