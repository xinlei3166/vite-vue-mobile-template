import { defineStore } from 'pinia'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX

export interface SystemState {
  showLandingPage: boolean
}

export const useSystemStore = defineStore('system', {
  state: (): SystemState => ({ showLandingPage: true }),
  getters: {
    ShowLandingPage(state) {
      return state.showLandingPage
    }
  },
  actions: {
    setLandingPage(showLandingPage: boolean) {
      this.showLandingPage = showLandingPage
    }
  }
  // persist: {
  //   key: storageKeyPrefix + 'System',
  //   storage: localStorage
  // }
})
