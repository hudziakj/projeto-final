<template>
  <div class="container">
    <!-- Menu de navegação -->
    <MenuLateral />

    <!-- Conteúdo principal -->
    <main class="content">
      <h1>Meus Chamados</h1>
      <table class="chamados-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Andamento</th>
            <th>Data de Abertura</th>
            <th>Requerente</th>
            <th>Técnico Responsável</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chamado in chamados" :key="chamado.id">
            <td>{{ chamado.id }}</td>
            <!-- Navegação para os detalhes do chamado -->
            <td>
              <router-link :to="`/ticket/${chamado.id}`">{{ chamado.titulo }}</router-link>
            </td>
            <td>{{ chamado.andamento }}</td>
            <td>{{ chamado.createdAt }}</td>
            <td>{{ chamado.requerente }}</td>
            <td>{{ chamado.responsavel }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import MenuLateral from '@/components/MenuLateral.vue';
import api from '@/utils/axios.js'; // Importa o arquivo axios.js

export default {
  name: 'ChamadosPage',
  data() {
    return {
      chamados: [], // Array para armazenar os chamados
    };
  },
  components:{
    MenuLateral
  },
  mounted() {
    this.fetchChamados();
  },
  methods: {
    async fetchChamados() {
      try {
        const response = await api.get('tickets/');
        this.chamados = response.data; // Adapte os campos conforme os dados da API
      } catch (err) {
        console.error('Erro ao carregar chamados', err);
      }
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

/* Menu lateral */
.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid #ccc;
}

.sidebar button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar button:hover {
  background-color: #0056b3;
}

/* Conteúdo principal */
.content {
  flex-grow: 1;
  padding: 2rem;
}

.chamados-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.chamados-table th,
.chamados-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.chamados-table th {
  background-color: #f4f4f4;
}
</style>
