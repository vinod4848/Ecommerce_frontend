import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getblogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md"
const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Views",
    dataIndex: "numViews",
  },
  {
    title: "Likes",
    dataIndex: "likes",
  },
  {
    title: "Dislikes",
    dataIndex: "disliked",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getblogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i,
      title: blogState[i].title,
      description: blogState[i].description,
      category: blogState[i].category,
      numViews: blogState[i].numViews,
      isLiked: blogState[i].isLiked,
      isDisliked: blogState[i].isDisliked,
      likes: blogState[i]?.likes?.length ? blogState[i]?.likes[0]?.firstName + " " + blogState[i]?.likes[0].lastName : "",
      disliked: blogState[i]?.disliked?.length ? blogState[i]?.disliked[0]?.firstName + " " + blogState[i]?.disliked[0].lastName : "",
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="ms-2 fs-3 text-danger">
            <MdOutlineDelete />
          </Link>
        </>

      )

    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
