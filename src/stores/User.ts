import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', () => {
  const username = ref("");
  const token = ref("");
  const isAdmin = ref(false);
  function changeUser(value: string) {
    username.value = value;
  }
  function changeToken(value: string) {
    token.value = value;
  }
  function changeAdmin(value: boolean) {
    isAdmin.value = value;
  }
  return { username, changeUser, token, changeToken, isAdmin, changeAdmin }
})
