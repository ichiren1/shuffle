import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ulid } from "ulid"
import { RootState } from "../../app/store"

export type Candidate = {
  name: string
  id: string
  isAvailable: boolean
}

export interface ShuffleState {
  candidates: Candidate[]
}

const initialState: ShuffleState = {
  candidates: [],
}

export const shuffleSlice = createSlice({
  name: "shuffle",
  initialState,
  reducers: {
    addCandidate: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        return
      }
      state.candidates.push({
        name: action.payload,
        id: ulid(),
        isAvailable: true,
      })
    },
    setCandidates: (state, action: PayloadAction<string[]>) => {
      if (!action.payload || action.payload.length === 0) {
        return
      }
      state.candidates = action.payload.map((p) => {
        return {
          name: p,
          id: ulid(),
          isAvailable: true,
        }
      })
    },
    modifyCandidate: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.candidates[action.payload.index] = {
        ...state.candidates[action.payload.index],
        name: action.payload.name,
      }
    },
    removeCandidate: (state, action: PayloadAction<string>) => {
      state.candidates = state.candidates.filter((c) => c.id !== action.payload)
    },
    excludeCandidate: (state, action: PayloadAction<string>) => {
      state.candidates = state.candidates.map((c) => {
        if (c.name === action.payload) {
          return { ...c, isAvailable: false }
        }
        return c
      })
    },
    resetCandicateAvailability: (state) => {
      state.candidates = state.candidates.map(c => {
        return { ...c, isAvailable: true }
      })
    }
  },
})

export const currentCandidateValue = (state: RootState) =>
  state.shuffle.candidates

export const { addCandidate, removeCandidate, modifyCandidate, setCandidates, excludeCandidate, resetCandicateAvailability } =
  shuffleSlice.actions

export default shuffleSlice.reducer
