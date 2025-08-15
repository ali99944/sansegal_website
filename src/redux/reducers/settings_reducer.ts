import { AppSettings } from '@/src/types/settings'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  settings: AppSettings | null
  isLoading: boolean
  error: string | null
}

const initialState: SettingsState = {
  settings: null,
  isLoading: false,
  error: null,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<AppSettings>) => {
      state.settings = action.payload
      state.isLoading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setSettings, setLoading, setError } = settingsSlice.actions
export default settingsSlice.reducer