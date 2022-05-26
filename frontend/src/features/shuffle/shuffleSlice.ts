import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ulid } from "ulid"
import { RootState } from "../../app/store"

export type Candidate = {
  name: string
  id: string
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
  },
})

export const currentCandidateValue = (state: RootState) =>
  state.shuffle.candidates

export const { addCandidate, removeCandidate, modifyCandidate, setCandidates } =
  shuffleSlice.actions

export default shuffleSlice.reducer
