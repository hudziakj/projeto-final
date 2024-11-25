<template>
    <div class="container">
      <!-- Menu Lateral -->
      <MenuLateral />
      
      <!-- Conteúdo Principal -->
      <div class="content">
        <div v-if="ticket">
          <h1>Detalhes do Chamado: {{ ticket.titulo }}</h1>
          <p><strong>Descrição:</strong> {{ ticket.descricao }}</p>
          <p><strong>Categoria:</strong> {{ ticket.categoria }}</p>
          <p><strong>Andamento:</strong> {{ ticket.andamento }}</p>
          <p><strong>Responsável:</strong> {{ ticket.responsavel }}</p>
          
          <!-- Comentários -->
          <div v-if="ticket.comentarios && ticket.comentarios.length">
            <h2>Comentários</h2>
            <ul>
              <li v-for="comment in ticket.comentarios" :key="comment.id">
                <p><strong>{{ comment.usuario }}:</strong> {{ comment.texto }}</p>
              </li>
            </ul>
          </div>
  
          <!-- Formulário para adicionar comentário -->
          <div>
            <textarea v-model="newComment" placeholder="Adicionar um comentário"></textarea>
            <button @click="addComment">Adicionar Comentário</button>
          </div>
        </div>
        
        <div v-else>
          <p>Carregando...</p>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
  import MenuLateral from '@/components/MenuLateral.vue';
  
  export default {
    data() {
      return {
        ticket: null,
        newComment: '',
      }
    },
    components: {
      MenuLateral
    },
    created() {
      this.fetchTicketDetail();
    },
    methods: {
      async fetchTicketDetail() {
        try {
          const response = await axios.get(`http://localhost:5000/tickets/${this.$route.params.id}`);
          this.ticket = response.data;
        } catch (error) {
          console.error("Erro ao carregar os detalhes do chamado:", error);
        }
      },
      async addComment() {
        if (this.newComment.trim()) {
          try {
            await axios.post(`http://localhost:5000/tickets/${this.ticket.id}/comentarios`, {
              texto: this.newComment,
              usuario: "Usuário Teste", // Aqui você pode adicionar o nome do usuário logado
            });
            this.fetchTicketDetail();
            this.newComment = ''; // Limpa o campo de comentário
          } catch (error) {
            console.error("Erro ao adicionar o comentário:", error);
          }
        }
      }
    }
  }
  </script>
  <style scoped>
/* Estrutura do layout */
.container {
  display: flex;
  height: 100vh; /* Certifique-se de que a altura ocupe toda a tela */
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
  position: fixed; /* Faz com que o menu lateral fique fixo na tela */
  height: 100vh; /* Faz o menu lateral ocupar toda a altura da tela */
  top: 0; /* Garante que o menu lateral fique fixo no topo */
}

/* Conteúdo principal */
.content {
  margin-left: 200px; /* Deixa espaço para o menu lateral */
  padding: 2rem;
  width: 100%;
  height: 100vh;
  overflow-y: auto; /* Garante que o conteúdo tenha rolagem se necessário */
}

.content h1 {
  margin-bottom: 1rem;
}

.content p {
  margin-bottom: 0.5rem;
}

.content textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 0.5rem;
}

.content button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content button:hover {
  background-color: #0056b3;
}
</style>