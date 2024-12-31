import { createSlice } from "@reduxjs/toolkit";

const estateSlide = createSlice({
  name: "estate",
  initialState: {
    get: {
      estate: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      estates: null,
      isFetching: false,
      error: false,
    },
    create: {
      estate: null,
      isFetching: false,
      error: false,
    },
    update: {
      estate: null,
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getEstateStart: (state) => {
      state.get.isFetching = true;
    },
    getEstateSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.estate = action.payload;
      state.get.error = false;
    },
    getEstateFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllEstateStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllEstateSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.estates = action.payload;
      state.getAll.error = false;
    },
    getAllEstateFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    createEstateStart: (state) => {
      state.create.isFetching = true;
    },
    createEstateSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.estate = action.payload;
      state.create.error = false;
    },
    createEstateFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    updateEstateStart: (state) => {
      state.update.isFetching = true;
    },
    updateEstateSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.estate = action.payload;
      state.update.error = false;
    },
    updateEstateFailure: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
    deleteEstateStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteEstateSuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.error = false;
    },
    deleteEstateFailure: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
  },
});

export const {
  getEstateStart,
  getEstateSuccess,
  getEstateFailure,
  getAllEstateStart,
  getAllEstateSuccess,
  getAllEstateFailure,
  createEstateStart,
  createEstateSuccess,
  createEstateFailure,
  updateEstateStart,
  updateEstateSuccess,
  updateEstateFailure,
  deleteEstateStart,
  deleteEstateSuccess,
  deleteEstateFailure,
} = estateSlide.actions;
export default estateSlide.reducer;
