import axios from "axios";
const addToCart = async (bookId: string) => {
  const url = import.meta.env.VITE_BACKEND_API;
  const response = await axios.post(
    `${url}/cart/add`,
    { bookId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.status === 201) return true;
  else return false;
};

export default addToCart;
