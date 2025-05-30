import { UserProps } from "../types/user";

import Search from "../components/Search";
import User from '../components/User';
import Error from "../components/Error";

import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState (false);

  const loadeUser = async (userName: string) => {
    setError(false);
    setUser(null);
    

    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();

    if (res.status === 404){
      setError(true);
      return;

    }

    const { avatar_url, login, location, followers, following, repos_url} = data;

    const userData: UserProps = {
      avatar_url, 
      login, 
      location, 
      followers, 
      following,
      repos_url,
    };

    setUser(userData);
  };
// O {...user} sped operations que é meu state
  return (
    <div>
      <Search loadUser={loadeUser}/>
      {user && <User {...user}/>}
      {error && <Error /> }
    </div>
  )
}

export default Home