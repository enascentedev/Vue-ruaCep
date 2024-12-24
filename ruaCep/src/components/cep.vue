<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <header class="p-4 shadow-md flex justify-between items-center bg-primary text-primary-content">
      <h1 class="text-2xl font-bold">Consulta de Endereço por CEP</h1>
      <label class="flex items-center cursor-pointer">
        <span class="mr-2 text-sm">
          {{ themeStore.isDarkTheme ? 'Modo Escuro' : 'Modo Claro' }}
        </span>
        <input 
          type="checkbox" 
          class="toggle toggle-primary" 
          :checked="themeStore.isDarkTheme" 
          @change="themeStore.toggleTheme($event.target.checked)" 
        />
      </label>
    </header>
    <main class="p-6 max-w-4xl mx-auto">
      <div class="form-control">
        <label class="label">
          <span class="label-text text-lg font-semibold">Digite o CEP:</span>
        </label>
        <div class="relative">
          <input
            type="text"
            placeholder="XXXXX-XXX"
            class="input input-bordered w-full pl-12"
            v-model="formattedCep"
            @input="handleCepInput"
            maxlength="9"
          />
          <i class="fas fa-map-pin absolute top-3 left-3 text-gray-500"></i>
        </div>
      </div>
      <div class="flex gap-4 mt-6">
        <button 
          class="btn btn-primary flex-1" 
          @click="cepStore.buscarCep"
          :disabled="cepStore.isLoading"
        >
          <span v-if="!cepStore.isLoading">Buscar CEP</span>
          <span v-else>Buscando...</span>
        </button>
        <button class="btn btn-accent flex-1" @click="cepStore.limparCampos" :disabled="cepStore.isLoading">
          Limpar
        </button>
      </div>

      <div v-if="cepStore.error" class="alert alert-error shadow-lg mt-6">
        {{ cepStore.error }}
      </div>

      <div v-if="cepStore.endereco" class="card bg-base-200 shadow-md mt-6">
        <div class="card-body">
          <h2 class="text-xl font-semibold">Endereço Encontrado</h2>
          <p><strong>Rua:</strong> {{ cepStore.endereco.logradouro }}</p>
          <p><strong>Bairro:</strong> {{ cepStore.endereco.bairro }}</p>
          <p><strong>Cidade:</strong> {{ cepStore.endereco.localidade }}</p>
          <p><strong>Estado:</strong> {{ cepStore.endereco.uf }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCepStore } from '../stores/cepStore';
import { useThemeStore } from '../stores/themeStore';

export default {
  name: 'Cep',
  setup() {
    const cepStore = useCepStore();
    const themeStore = useThemeStore();

    // Inicializar o tema ao montar o componente
    themeStore.initializeTheme();

    // Computed property para formatar o CEP com a máscara
    const formattedCep = computed({
      get: () => cepStore.cep,
      set: (value) => cepStore.updateCep(value),
    });

    // Função para lidar com a entrada do usuário
    const handleCepInput = (event) => {
      cepStore.validateAndFormatCep(event.target.value);
    };

    return {
      cepStore,
      themeStore,
      formattedCep,
      handleCepInput,
    };
  },
};
</script>

