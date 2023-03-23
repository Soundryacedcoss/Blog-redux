import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler, deletePost, fetchPost, like } from "../reducer/Slice";

export const Blog = () => {
  const data = useSelector((state) => state.fetchPost);
  console.log(data);
  const dispatch = useDispatch();
  const [blog1, setBlog1] = useState([]);
  const [msg, setMsg] = useState("");
  const [editClick, setEditClick] = useState(false);
  const tittle = useRef();
  const content = useRef();
  const CommentRef = useRef();
  useEffect(() => {
    dispatch(fetchPost());
    let post = JSON.parse(localStorage.getItem("AllBlog"));
    setBlog1(post);
  }, []);
  console.log("redux data", data.post);
  let user = JSON.parse(localStorage.getItem("userAccount"));
  const DeleteHandler = (id) => {
    dispatch(deletePost(id));
  };
  const LikeHandler = (id) => {
    if (user === null) {
      alert("Please login");
    } else {
      dispatch(like(id));
    }
  };
  const CreateHandler = () => {
    if (tittle.current.value === "" && content.current.value === "") {
      setMsg("All field mandetory!");
    } else {
      let post = JSON.parse(localStorage.getItem("AllBlog"));
      let arr = [];
      arr = post;
      let obj = {
        id: Math.random(),
        title: tittle.current.value,
        body: content.current.value,
      };
      arr.push(obj);
      localStorage.setItem("AllBlog", JSON.stringify(arr));
      setBlog1(JSON.parse(localStorage.getItem("AllBlog")));
      tittle.current.value = "";
      content.current.value = "";
      setMsg("Created successfully!");
    }
  };
  console.log(blog1);
  const CloseHandler = () => {
    setMsg("");
  };
  const EditHandler = (id) => {
    if (user === null) {
      alert("Please login ..");
    } else {
      setEditClick(true);
      blog1.forEach((element) => {
        if (element.id === id) {
          console.log(element);
          blog1.splice(element, 1);
          tittle.current.value = element.title;
          content.current.value = element.body;
          setBlog1([...blog1]);
          localStorage.setItem("AllBlog", JSON.stringify(blog1));
        }
      });
    }
  };
  const CommentHandler = (id) => {
    if (user === null) {
      alert("Please Login first..");
    } else {
      let obj = {
        id: id,
        comment: CommentRef.current.value,
      };
      dispatch(commentHandler(obj));
    }
  };
  const CommentBoxHandler = (e) => {
    CommentRef.current.value = e.target.value;
  };
  console.log("blog", blog1);
  return (
    <div className="text-center">
      <center>
        <div class="card w-50 p-3 mt-4">
          <div class="input-group mb-3">
            <span class="input-group-text w-25" id="basic-addon1">
              Blog Tittle
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Write Blog Tittle"
              aria-label="Username"
              aria-describedby="basic-addon1"
              ref={tittle}
            />
          </div>
          <div class="mb-3 mt-3">
            <textarea
              type="text"
              class="form-control"
              cols="50"
              rows="10"
              placeholder="Start writing content here..."
              aria-label="With textarea"
              aria-describedby="basic-addon1"
              ref={content}
            />
          </div>
          <button className="btn btn-primary" onClick={CreateHandler}>
            {editClick ? "Save" : "Create Blog"}
          </button>
          {msg === "" ? null : (
            <div
              class="alert alert-warning alert-dismissible fade show mt-3"
              role="alert"
            >
              {msg}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={CloseHandler}
              ></button>
            </div>
          )}
        </div>
      </center>
      {JSON.parse(localStorage.getItem("AllBlog")) === null ? (
        <center>
          <div class="spinner-border text-dark mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </center>
      ) : (
        JSON.parse(localStorage.getItem("AllBlog")).map((val) => (
          <div className="blog__card mt-5" key={Math.random()}>
            {" "}
            <h3> {val.title}</h3> <hr />
            <p className="h-auto">{val.body}</p>
            <hr />{" "}
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="mt-3"
            >
              <div className="me-3 mt-4">
                <i
                  class={`${
                    val.liked === true
                      ? "fa fa-heart me-4 red"
                      : "fa fa-heart me-4"
                  }`}
                  onClick={() => LikeHandler(val.id)}
                ></i>

                <i
                  class="fa fa-comment-o me-4"
                  onClick={() => CommentHandler(val.id)}
                ></i>
                <input
                  type="text"
                  class="input"
                  placeholder="Please comment here..."
                  ref={CommentRef}
                  onChange={CommentBoxHandler}
                />
                {data.comment != null ? (
                  <div className="comment">
                    {data.comment !== null
                      ? data.comment.map((item) =>
                          val.id === item.id ? (
                            <>
                              {" "}
                              <li>{item.comment} </li> <hr />{" "}
                            </>
                          ) : null
                        )
                      : null}
                  </div>
                ) : null}
              </div>
              <div className="me-3 mt-4">
                <i
                  class="fa fa-trash-o me-4"
                  onClick={() => DeleteHandler(val.id)}
                ></i>
                <i
                  class="fa fa-edit me-4"
                  onClick={() => EditHandler(val.id)}
                ></i>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
