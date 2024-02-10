import { Categories } from "../Components/Categories/Categories";
import { DataUserForm } from "../Components/DataUserForm/DataUserForm";
import { Sales } from "../Components/Sales/Sales";

export const MainPage = () => {
  return (
    <main>
      <Categories />
      <DataUserForm />
      <Sales />
    </main>
  );
};
