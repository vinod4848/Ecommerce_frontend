import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomInput } from "../components/CustomInput";
import Dropzone from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import { dellImages, uploadImages } from "../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getblogCats } from "../features/blogCat/blogCatSlice";
import { createBlog, resetState } from "../features/blog/blogSlice";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const navigate = useNavigate();
  const [images, setimages] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getblogCats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isLoding, isError, isSuccess, createdProdduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProdduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoding, isError, isSuccess]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      dispatch(createBlog(values));
      formik.resetForm();
      setimages(null);
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/blog-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div>
          <CustomInput
            theme="snow"
            label="Enter Product Description"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
        </div>
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <select
          name="category"
          onChange={formik.handleChange("category")}
          onBlur={formik.handleBlur("category")}
          val={formik.values.category}
          className="form-control py-3 mb-3"
          id=""
        >
          <option value="">Select Category</option>
          {blogCatState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <div className="bg-white border-1 p-5 text-center">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimage d-flex flex-wrap gap-3">
          {imgState?.map((i, j) => {
            return (
              <div className="position-relative " key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(dellImages(i.public_id))}
                  className="btn-close position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    backgroundColor: "white",
                  }}
                ></button>
                <img src={i.url} alt="" width={200} height={200}></img>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-success border-0 rounde-3 my-5"
          type="submit"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
