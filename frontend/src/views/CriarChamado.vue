<template>
    <div class="container">
      <!-- Menu de navegação -->
      <aside class="sidebar">
        <button @click="navigateTo('CriarChamado')">Criar Chamado</button>
        <button @click="navigateTo('ChamadosPage')">Meus Chamados</button>
      </aside>
  
      <!-- Conteúdo principal -->
      <main class="content">
        <h1>Criar Chamado</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" v-model="titulo" required />
          </div>
          <div class="form-group">
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" v-model="descricao" required></textarea>
          </div>
          <div class="form-group">
            <label for="categoria">Categoria:</label>
            <select id="categoria" v-model="categoria" required>
              <option value="Suporte">Outros</option>
              <option value="Manutenção">Manutenção </option>
              <option value="Novo Usuário">Compras</option>
              <!-- Adicione outras opções conforme necessário -->
            </select>
          </div>
          <!-- Campo de Técnico Responsável -->
          <div class="form-group">
            <label for="tecnico">Técnico Responsável:</label>
            <input type="text" id="tecnico" v-model="tecnico" readonly />
          </div>
          <div class="form-group">
            <button type="submit">Criar Chamado</button>
          </div>
        </form>
      </main>
    </div>
  </template>

<script>
import api from '@/utils/axios.js'; // Importa o arquivo axios.js

export default {
  name: 'CriarChamado',
  data() {
    return {
      titulo: '',
      descricao: '',
      categoria: 'Suporte', // Valor padrão da categoria
      tecnico: 'Matheus',  // Técnico responsável (valor fixo)
    };
  },
  methods: {
    async submitForm() {
      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        categoria: this.categoria,
        responsavel: this.tecnico, // Inclui o técnico no objeto enviado
      };

      try {
        // Envia a requisição para criar o chamado
        await api.post('tickets/create', chamadoData); // Removemos a variável 'response'
        // Navega para a página de chamados após a criação do chamado
        this.$router.push({ name: 'ChamadosPage' });
      } catch (err) {
        console.error('Erro ao criar chamado', err);
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input[readonly] {
  background-color: #f4f4f4;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
