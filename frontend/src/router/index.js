import { createRouter, createWebHistory } from "vue-router"; // Importe corretamente
import LoginPage from "@/views/Login.vue";
import RegisterPage from "@/views/Register.vue";
import HelloWorld from "@/components/HelloWorld.vue";

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
    path: "/hello",
    name: "HelloWorld",
    component: HelloWorld,
    props: true, // Permite passar dados como props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
