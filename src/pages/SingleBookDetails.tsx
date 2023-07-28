import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/api/ApiSlice";

const SingleBookDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  console.log(data);

  return <div>{data?.data?.title}</div>;
};

export default SingleBookDetails;
