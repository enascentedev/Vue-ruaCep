import { defineStore } from 'pinia';
import axios from 'axios';

export const useCepStore = defineStore('cep', {
  state: () => ({
    cep: '',
    endereco: null,
    error: null,
    isLoading: false, 
  }),
  actions: {
    // Variável para armazenar o timeout do erro
    _errorTimeout: null,

    updateCep(value) {
      // Atualiza o CEP sem formatação
      this.cep = value;
    },

    // Função para definir erro e limpar após 3 segundos
    setError(message) {
      this.error = message;

      // Se já existe um timeout, limpa-o
      if (this._errorTimeout) {
        clearTimeout(this._errorTimeout);
      }

      // Define um novo timeout para limpar o erro após 3 segundos
      this._errorTimeout = setTimeout(() => {
        this.error = null;
        this._errorTimeout = null;
      }, 3000);
    },

    validateAndFormatCep(value) {
      // Remove todos os caracteres não numéricos
      const cleanValue = value.replace(/\D/g, '');

      // Limita a 8 dígitos
      if (cleanValue.length > 8) {
        this.setError('O CEP deve ter exatamente 8 dígitos.');
        this.cep = cleanValue.slice(0, 8);
        return;
      }

      // Formata com a máscara XXXXX-XXX
      if (cleanValue.length > 5) {
        this.cep = `${cleanValue.slice(0, 5)}-${cleanValue.slice(5)}`;
      } else {
        this.cep = cleanValue;
      }

      // **Remove a validação de CEP incompleto 
      if (cleanValue.length === 8) {
        this.error = null;
      }
    },

    async buscarCep() {
      // Remove o hífen para a requisição
      const cepNumerico = this.cep.replace('-', '');

      // Verifica se o CEP está vazio
      if (!cepNumerico) {
        this.setError('Por favor, insira um CEP.');
        return;
      }

      // Validação adicional
      if (cepNumerico.length !== 8) {
        this.setError('Por favor, insira um CEP válido com 8 dígitos.');
        return;
      }

      try {
        this.error = null;
        this.endereco = null;
        this.isLoading = true; // Inicia o carregamento

        const response = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json/`);

        if (response.data.erro) {
          this.setError('CEP não encontrado.');
          this.endereco = null;
        } else {
          this.endereco = response.data;
        }
      } catch (err) {
        this.setError('Erro ao buscar o CEP. Tente novamente mais tarde.');
        this.endereco = null;
      } finally {
        this.isLoading = false; // Finaliza o carregamento
      }
    },

    limparCampos() {
      this.cep = '';
      this.endereco = null;
      this.error = null;
      this.isLoading = false; 

      // Limpa qualquer timeout de erro existente
      if (this._errorTimeout) {
        clearTimeout(this._errorTimeout);
        this._errorTimeout = null;
      }
    },
  },
});
