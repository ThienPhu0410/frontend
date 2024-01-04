import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber, sortOrder } = {}) => {
        const params = { keyword, pageNumber, sortOrder };
        return {
          url: PRODUCTS_URL,
          params,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
      tagTypes: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    getProductsByBrand: builder.query({
      query: ({ brand, pageNumber, sortOrder } = {}) => {
        const params = { brand, pageNumber, sortOrder };
        return {
          url: PRODUCTS_URL,
          params,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    getProductsByCategory: builder.query({
      query: ({ category, pageNumber, sortOrder } = {}) => {
        const params = { category, pageNumber, sortOrder };
        return {
          url: PRODUCTS_URL,
          params,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    getAllProducts: builder.query({
      query: ({ sortOrder } = {}) => ({
        url: `${PRODUCTS_URL}/all`,
        params: { sortOrder },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetProductsByBrandQuery,
  useGetProductsByCategoryQuery,
  useGetAllProductsQuery,
} = productsApiSlice;
