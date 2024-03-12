import { Cart } from "../Components/Cart/Cart";
import { TitleBar } from "./../Components/TitleBar/TitleBar";

export const CartPage = () => {
  return (
    <section>
      <TitleBar
        title="Shopping cart"
        linkTo="/products"
        buttonText="Back to the store"
      />
      <Cart />
    </section>
  );
};
