export type ErrorResponse = {
  status: number,
  statusText: string,
} & Record<string, any>;

export function handleResponse(response: Response): Promise<ErrorResponse|any> {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          ...json,
          status: response.status,
          statusText: response.statusText,
        };

        return Promise.reject(error);
      }

      return json;
    });
}
