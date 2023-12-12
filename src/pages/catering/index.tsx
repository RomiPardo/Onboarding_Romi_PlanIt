import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useSearchFilterContext } from "~/contexts/SearchFilterContext";

const Catering = () => {
  const { searchFilter, setSearchFilter } =
    useSearchFilterContext("searchFilter");

  return (
    <Layout onClick={() => setSearchFilter(undefined)}>
      <ServiceScroll category="CATERING" searchFilter={searchFilter ?? ""} />
    </Layout>
  );
};

export default Catering;
