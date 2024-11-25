<template>
    <aside class="sidebar">
      <button @click="navigateTo('CriarChamado')">Criar Chamado</button>
      <button @click="navigateTo('ChamadosPage')">Meus Chamados</button>
    </aside>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      },
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  