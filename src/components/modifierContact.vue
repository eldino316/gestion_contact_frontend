<script>

import apiClient from './apiClient';

  export default {
    name: 'modalModifier',

    data() {
      return {
        contacts: [],
        newContact: {
          name: '',
          email: '',
          phone: ''
        }
      };
    },


    methods: {
      close() {
        this.$emit('close');
      },

      ajout(){
        apiClient.post('contacts', this.newContact).then(response => {
          this.contacts.push(response.data);
          this.newContact = { name: '', email: '', phone: '' };
        });
      }
    },
  };
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <form  class="w3-container w3-card-4" @submit.prevent=" addContact">
        <P>
          <label>id:</label>
          <input class="w3-input" style="width: 90%;" type="text" v-model="newContact.id" required>
        </P>
        <p>
          <label>Nom:</label>
          <input class="w3-input" style="width: 90%;" type="text" v-model="newContact.name" required>
        </p>
      <p>
          <label>Email:</label>
          <input class="w3-input" style="width: 90%;" type="email" v-model="newContact.email" required>
      </p>

      <p>
          <label>Numéro de téléphone:</label>
          <input class="w3-input" style="90%" type="tel" v-model="newContact.phone" required>
    </p>
    <p>
      <button class="w3-button w3-section w3-teal w3-ripple" type="submit"> MODIFIER </button>
    </p>
        
      </form>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>