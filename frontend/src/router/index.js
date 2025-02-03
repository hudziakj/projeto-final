import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/Login.vue";
import RegisterPage from "@/views/Register.vue";
import ChamadosPage from "@/views/ChamadosPage.vue";
import CriarChamado from "@/views/CriarChamado.vue";
import ChamadoDetalhe from "@/views/ChamadoDetalhe.vue";
import ErroPage from "@/views/ErroPage.vue";
import AcessoNegado from "@/views/AcessoNegado.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/chamados",
    name: "ChamadosPage",
    component: ChamadosPage,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/chamadosCriar",
    name: "CriarChamado",
    component: CriarChamado,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/ticket/:id",
    name: "ChamadoDetalhe",
    component: ChamadoDetalhe,
    meta: { requiresAuth: true }, // Proteção de rota
    props: true,
  },
  {
    path: "/403",
    name: "AcessoNegado",
    component: AcessoNegado,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErroPage",
    component: ErroPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware de autenticação para proteger rotas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o token existe no localStorage
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/403"); // Redireciona para a página de Acesso Negado
  } else {
    next(); // Permite acesso
  }
});

export default router;
