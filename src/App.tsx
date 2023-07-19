import { Home } from "./pages/Home";
import { createServer } from "miragejs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const server = createServer({});

server.get("/api/get_ui", (_base) => {
  console.log(_base);
  return [
    {
      element: "header",
      content: [
        {
          element: "h1",
          content: "Hello World",
        },
        {
          element: "h2",
          content: "Este é um texto em parágrafo",
        },
        {
          element: "div",
          content: [
            {
              element: "h1",
              content: "Hello World",
            },
            {
              element: "h2",
              content: "Este é um texto em parágrafo",
            },
          ],
        },
      ],
    },
  ];
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
