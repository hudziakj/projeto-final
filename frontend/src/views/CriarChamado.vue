<template>
    <div class="container">
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
              <option value="Outros">Outros</option>
              <option value="Manutenção">Manutenção </option>
              <option value="Compras">Compras</option>
              <!-- Adicione outras opções conforme necessário -->
            </select>
          </div>
          <!-- Campo de Técnico Responsável -->
          <div class="form-group">
            <label for="tecnico">Responsável:</label>
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
  created() {
  // Recupera o ID do usuário armazenado no localStorage
  const userId = localStorage.getItem('userId'); // Supondo que você tenha armazenado o ID do usuário
  this.requerente = userId ? JSON.parse(userId) : ''; // Remove as aspas extras, caso existam
},
  data() {
    return {
      titulo: '',
      descricao: '',
      categoria: 'Suporte', // Valor padrão da categoria
      tecnico: 'Matheus',  // Técnico responsável (valor fixo)
      requerente: ""
    };
  },
  methods: {
    async submitForm() {
      console.log(this.requerente)
      const chamadoData = {
        titulo: this.titulo,
        descricao: this.descricao,
        categoria: this.categoria,
        responsavel: this.tecnico, // Inclui o técnico no objeto enviado
        requerente: this.requerente
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

textarea{
  resize: none;
  height: 25vh;
}

.container {
  display: flex;
  flex-direction: row;
}

/* Conteúdo principal */
.content {
  flex-grow: 1;
  padding: 1rem;
}

.content > h1{
  margin-top: -1rem;
  margin-bottom: 1rem;
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
  font-size: 1rem;
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
