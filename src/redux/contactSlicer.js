import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63c3aa08a9085635752af165.mockapi.io/api/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: ({name, phone}) => ({
        url: 'contacts',
        method: 'POST',
        body: { name, phone }
      }),
      invalidatesTags: ['Contacts']
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllContactsQuery, useDeleteContactsMutation, useAddContactMutation } =
  contactsApi;
