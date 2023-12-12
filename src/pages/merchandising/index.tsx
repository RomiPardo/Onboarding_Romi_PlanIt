import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useSearchFilterContext } from "~/contexts/SearchFilterContext";

const Merchandising = () => {
  const { searchFilter, setSearchFilter } =
    useSearchFilterContext("searchFilter");

  return (
    <Layout onClick={() => setSearchFilter(undefined)}>
      <ServiceScroll
        category="MERCHANDISING"
        searchFilter={searchFilter ?? ""}
      />
    </Layout>
  );
};

export default Merchandising;
