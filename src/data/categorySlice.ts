import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      {
        text: 'Meetings',
        color: 'blue',
        icon: 'groups',
        type: 'material'
      },
      {
        text: 'Shopping',
        color: 'purple',
        icon: 'shopping-cart',
        type: 'material'
      },
      {
        text: 'Study',
        color: 'green',
        icon: 'school',
        type: 'material'
      },
      {
        text: 'Workout',
        color: 'red',
        icon: 'heart',
        type: 'material-community'
      },
      {
        text: 'Cooking',
        color: 'orange',
        icon: 'fastfood',
        type: 'material'
      },
      {
        text: 'Travel',
        color: 'brown',
        icon: 'airport-shuttle',
        type: 'material'
      }]
    },
  reducers: {
    addCategory (state, { payload }) {
      const { name, color, icon, type, text } = payload;
      return {
        ...state,
        categories:[ ...state.categories, {
          text,
          name,
          color,
          icon,
          type
        }]
      }
    },
    deleteCategory (state, { payload }) {
      const text = payload
      return {
        ...state,
        categories: state.categories.filter( category => category.text !== text)
      }
    },
  },
})

export const { addCategory, deleteCategory } =
  categorySlice.actions

export default categorySlice.reducer
