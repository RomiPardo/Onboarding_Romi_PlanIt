import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useSearchFilterContext } from "~/contexts/SearchFilterContext";

const Present = () => {
  const { searchFilter, setSearchFilter } =
    useSearchFilterContext("searchFilter");

  return (
    <Layout onClick={() => setSearchFilter(undefined)}>
      <ServiceScroll category="PRESENT" searchFilter={searchFilter ?? ""} />
    </Layout>
  );
};

export default Present;
