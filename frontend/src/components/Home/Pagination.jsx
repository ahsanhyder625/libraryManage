import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

function PaginationData() {
  const [is_Loading, setLoading] = useState(true);
  const [is_error, seterror] = useState(false);
  const [albums_data, setAlbums_data] = useState([]);
  const [active_page, setActivePage] = useState(1);
  const [total_data, setTotalData] = useState(0);
  const [limit] = useState(5);
  const get_Albums_data = async () => {
    await axios
      .get(
        `http://localhost:5000/api/albums?page=${active_page}&limit=${limit}`
      )
      .then((res) => {
        // console.log(res.data);
        setAlbums_data(res.data.current);
        setTotalData(res.data.totalItem);
      })
      .catch((err) => {});
    setLoading(false);
  };

  const handlePageChange = (e, page) => {
    setActivePage(page);
    get_Albums_data();
  };

  useEffect(() => {
    get_Albums_data();
  }, []);
  return (
    <div>
      <Grid md={12}>
        <Pagination
          style={{ marginLeft: "40%", marginTop: "10px" }}
          count={Math.ceil(total_data / limit)}
          onChange={handlePageChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
          page={active_page}
        />
      </Grid>
    </div>
  );
}

export default PaginationData;
