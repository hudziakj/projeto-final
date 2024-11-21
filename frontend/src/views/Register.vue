<template>
  <div>
    <h2>Registro</h2>
    
    <!-- Formulário de Registro -->
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nome">Nome</label>
        <input type="text" v-model="form.nome" id="nome" required />
      </div>

      <div>
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>

      <div>
        <label for="departamento">Departamento</label>
        <input type="text" v-model="form.departamento" id="departamento" required />
      </div>

      <div>
        <label for="senha">Senha</label>
        <input type="password" v-model="form.senha" id="senha" required />
      </div>

      <div>
        <label for="confirmaSenha">Confirmar Senha</label>
        <input type="password" v-model="form.confirmaSenha" id="confirmaSenha" required />
      </div>

      <button type="submit">Registrar</button>
    </form>

    <!-- Exibir mensagem de erro ou sucesso -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        nome: "",
        email: "",
        departamento: "",
        senha: "",
        confirmaSenha: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
  // Verificar se as senhas são iguais
  if (this.form.senha !== this.form.confirmaSenha) {
    this.errorMessage = "As senhas não coincidem!";
    return;
  }

  try {
    // Enviar requisição POST para o back-end
    const response = await axios.post("http://localhost:5000/users/register", {
      nome: this.form.nome,
      email: this.form.email,
      departamento: this.form.departamento,
      senha: this.form.senha,
      confirmaSenha: this.form.confirmaSenha,
    });

    // Exibir mensagem de sucesso
    if (response.status === 200) {
      this.successMessage = "Usuário registrado com sucesso!";
      this.errorMessage = "";
      // Resetar o formulário
      this.form = {
        nome: "",
        email: "",
        departamento: "",
        senha: "",
        confirmaSenha: "",
      };
    }
  } catch (error) {
    console.log("Erro completo:", error); // Imprime todo o erro para depuração
    // Aqui, verificamos se o erro tem a propriedade `response`
    if (error.response) {
      console.log("Erro de resposta da API:", error.response); // Detalha a resposta da API
      this.errorMessage = `Erro ao registrar usuário: ${error.response.data.message || error.response.statusText}`;
    } else {
      console.log("Erro sem resposta da API:", error); // Caso o erro não tenha `response`
      this.errorMessage = "Erro desconhecido ao tentar registrar o usuário.";
    }
    this.successMessage = ""; // Limpar mensagem de sucesso em caso de erro
  }
}

,
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}
</style>
