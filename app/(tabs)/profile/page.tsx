import LogoutButton from "./(components)/logout-button";
import { getUser } from "./actions";

export default async function Profile() {
  const user = await getUser();

  return (
    <div>
      <h1>Nice to meet you! {user?.username}</h1>
      <LogoutButton />
    </div>
  );
}
