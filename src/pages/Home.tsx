import Footer from "../components/Footer";
import Header from "../components/Header";
import WikiList from "../components/WikiList";
import UserList from "../components/UserList";
import EntityList from "../components/EntityList";
import Addbutton from "../components/AddButton";
import { useWiki } from "../context/WikiContext";

export default function Home() {
  const { dataType } = useWiki();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {dataType === 'lenguajes' && <WikiList />}
        {dataType === 'usuarios' && <UserList />}
        {dataType === 'entidades' && <EntityList />}
        <Addbutton />
      </main>
      <Footer />
    </div>
  );
}
