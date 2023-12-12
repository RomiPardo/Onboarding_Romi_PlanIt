import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useSearchFilterContext } from "~/contexts/SearchFilterContext";

const Events = () => {
  const { searchFilter, setSearchFilter } =
    useSearchFilterContext("searchFilter");

  return (
    <Layout onClick={() => setSearchFilter(undefined)}>
      <ServiceScroll category="EVENT" searchFilter={searchFilter ?? ""} />
    </Layout>
  );
};

export default Events;
