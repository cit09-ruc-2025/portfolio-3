import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function QueryClientProvider({ children }) {
  return <Provider client={queryClient}>{children}</Provider>;
}
