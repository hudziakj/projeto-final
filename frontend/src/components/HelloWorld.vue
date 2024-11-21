<template>
    <div>
      <h1>Hello World</h1>
      <p>Bem-vindo, {{ name }}!</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  