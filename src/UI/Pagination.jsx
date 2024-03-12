import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ count, handleChange }) => {
  return (
    <Pagination
      count={count}
      variant="outlined"
      defaultPage={1}
      color="secondary"
      size="medium"
      onChange={handleChange}
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
