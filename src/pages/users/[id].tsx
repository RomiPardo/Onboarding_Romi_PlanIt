import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
};

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.user.getById.useQuery(
    typeof query.id === "string" ? query.id : "",
  );

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );

  /*
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
  */
};
