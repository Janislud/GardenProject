import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ count, handleChange }) => {
  
  const handlePageChange = (event, page) => {
    handleChange(event, page); // Передаем событие и номер страницы внешнему обработчику
    window.scrollTo(0, 0); // Прокрутка наверх страницы
  };

  return (
    <Pagination
      count={count}
      variant="outlined"
      defaultPage={1}
      color="secondary"
      size="medium"
      onChange={handlePageChange}
      sx={{
        maxWidth: "1300px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "50px auto",
        textAlign: "center",
      }}
    />
  );
};

export default CustomPagination;
