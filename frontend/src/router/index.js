import { createRouter, createWebHistory } from "vue-router"; // Importe corretamente
import LoginPage from "@/views/Login.vue";
import RegisterPage from "@/views/Register.vue";
import ChamadosPage from "@/views/ChamadosPage.vue";
import CriarChamado from "@/views/CriarChamado.vue";
import ChamadoDetalhe from "@/views/ChamadoDetalhe.vue";

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
    props: true, // Permite passar dados como props
  },
  {
    path: "/chamadosCriar",
    name: "CriarChamado",
    component: CriarChamado,
    props: true, // Permite passar dados como props
  },
  {
    path: "/ticket/:id", // Rota para o detalhe do chamado
    name: "ChamadoDetalhe",
    component: ChamadoDetalhe,
    props: true, // Permite passar o id como prop para o componente
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
