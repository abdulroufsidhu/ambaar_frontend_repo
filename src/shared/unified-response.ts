export interface MyApiResponse<T> {
  status?: number,
  message?: string,
  data?: T,
}