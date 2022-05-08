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
    removeCandidate: (state, action: PayloadAction<string>) => {
      state.candidates = state.candidates.filter((c) => c.id !== action.payload)
    },
  },
})

export const currentCandidateValue = (state: RootState) =>
  state.shuffle.candidates

export const { addCandidate, removeCandidate } = shuffleSlice.actions

export default shuffleSlice.reducer
