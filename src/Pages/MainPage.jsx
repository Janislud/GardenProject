import { Categories } from "../Components/Categories/Categories";
import { DataUserForm } from "../Components/DataUserForm/DataUserForm";
import { MainBanner } from "../Components/MainBanner/MainBanner";
import { Sales } from "../Components/Sales/Sales";

export const MainPage = () => {
  return (
    <main>
      <MainBanner/>
      <Categories />
      <DataUserForm />
      <Sales />
    </main>
  );
};
