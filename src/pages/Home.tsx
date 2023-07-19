import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Structure {
  element: string;
  content: Structure[] | string;
}

const getUi = async () => {
  const data = await axios.get("/api/get_ui");
  return data?.data as Structure[];
};

export const Home = () => {
  const { data: content = {} } = useQuery(["get_ui"], getUi);

  const mapElements = (content: Structure[]) => {
    if (!content || !Array.isArray(content)) {
      return null;
    }
    return content
      .map((item, i) => ({ ...item, key: i.toString() }))
      .map(
        (
          item: Structure & {
            key: string;
          }
        ) => {
          const ComponentMain = item.element as unknown as React.FC<{
            children: React.ReactNode;
          }>;
          if (typeof item.content === "string") {
            return <ComponentMain key={item.key}>{item.content}</ComponentMain>;
          } else {
            return (
              <ComponentMain key={item.key}>
                {mapElements(item.content)}
              </ComponentMain>
            );
          }
        }
      );
  };

  return <>{mapElements(content as unknown as Structure[])}</>;
};

export default Home;
