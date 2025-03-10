import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

//import { logout } from './authSlice'; // Import the logout action

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery, // Use the customized baseQuery
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});