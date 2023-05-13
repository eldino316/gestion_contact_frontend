<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/w3-css/4.1.0/w3.css">
  </head>
    <div>
      <div class="w3-container w3-half w3-margin-top">
        <header class="w3-teal">
        <h1>Ajouter un contact</h1>
      </header>
        <form  class="w3-container w3-card-4" @submit.prevent="addContact">
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
      <button class="w3-button w3-section w3-teal w3-ripple" type="submit"> AJOUTER </button>
    </p>
        
      </form> 
      </div>      
    </div>

  <div class="w3-card-4 w3-half w3-margin-top" >
    <header class="w3-teal">
        <h1>Liste des contact</h1>
      </header>
    <button class="w3-button w3-section w3-teal w3-ripple" @click="afficheContacts">Afficher les contacts</button>
    <table class="w3-table-all w3-centered">
      <thead>
        <tr class="w3-light-grey">
          <th>ID</th>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact, index) in contacts" :key="index">
          <td>{{ contact.id }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button class="w3-button w3-red w3-round-large" @click="deleteContact(contact.name)">
              Supprimer
            </button>
            <button class="w3-button w3-blue w3-round-large" @click=" showModal">
              modifier
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <modalModifier
      v-show="isModalVisible"
      @close="closeModal"
    />

  </template>
  
  <script>

import apiClient from './apiClient';
import modalModifier from './modifierContact.vue';
  
  export default {
    name: 'ContactList',
    components: {
      modalModifier,
    },

    data() {
      return {
        contacts: [],
        newContact: {
          name: '',
          email: '',
          phone: ''
        },
        isModalVisible: false,
      };
    },
    mounted() {
      this.fetchContacts();
    },
    methods: {
      fetchContacts() {
        apiClient.get('contacts').then(response => {
          this.contacts = response.data;
        });
      },
      addContact() {
        apiClient.post('contacts', this.newContact).then(response => {
          this.contacts.push(response.data);
          this.newContact = { name: '', email: '', phone: '' };
          this.afficheContacts()
        });
      },
      deleteContact(name) {
        const contactToDelete = this.contacts.find(c => c.name === name)
      if (!contactToDelete) {
        console.log(`Contact avec le nom ${name} non trouvé.`)
        return
      }
      const id = contactToDelete.id
      apiClient.delete(`contacts/${id}`)
        .then(response => {
          console.log(response.data)
          // actualiser la liste des contacts après la suppression
          this.afficheContacts()
        })
        .catch(error => {
          console.log(error)
        })
      },

      afficheContacts(){
        apiClient.get('contacts').then(response => { 
           this.contacts = response.data;
        } );
      },

      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }

      
    }
  };
  </script>
  