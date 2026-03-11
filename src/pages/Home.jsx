import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Home() {

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data);

    if (data) {
      data.forEach((post) => {
        getComments(post.id);
      });
    }
  };

  const getComments = async (postId) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    setComments((prev) => ({
      ...prev,
      [postId]: data
    }));
  };

  const addComment = async (postId) => {
    if (!newComment) return;

    await supabase
      .from("comments")
      .insert([
        {
          post_id: postId,
          content: newComment,
          author: "Carlos"
        }
      ]);

    setNewComment("");
    getComments(postId);
  };

  const deletePost = async (id) => {
    await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    getPosts();
  };

  return (

    <div style={{
      maxWidth: "750px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial",
      background: "#f6f7f8",
      minHeight: "100vh"
    }}>

      <h1 style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        Reddit 
      </h1>

      {posts.map((post) => (

        <div key={post.id} style={{
          background: "white",
          padding: "80px",
          marginBottom: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
        }}>

          <h2 style={{marginBottom:"10px"}}>
            {post.title}
          </h2>

          <p style={{marginBottom:"15px"}}>
            {post.content}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              style={{
                width:"100%",
                borderRadius:"10px",
                marginBottom:"15px"
              }}
            />
          )}

          <p style={{color:"#777", fontSize:"14px"}}>
            Author: {post.author}
          </p>

          <button
            onClick={() => deletePost(post.id)}
            style={{
              background:"#ff4d4f",
              border:"none",
              color:"white",
              padding:"15px 30px",
              borderRadius:"6px",
              cursor:"pointer",
              marginTop:"10px"
            }}
          >
            Eliminar Post
          </button>

          <hr style={{margin:"20px 0"}} />

          <h4>Comentarios</h4>

          {comments[post.id]?.map((c) => (
            <div key={c.id} style={{
              background:"#f1f2f3",
              padding:"8px",
              borderRadius:"6px",
              marginTop:"8px"
            }}>
              <b>{c.author}</b>: {c.content}
            </div>
          ))}

          <div style={{display:"flex", marginTop:"10px"}}>

            <input
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex:1,
                padding:"8px",
                borderRadius:"6px",
                border:"1px solid #ccc"
              }}
            />

            <button
              onClick={() => addComment(post.id)}
              style={{
                marginLeft:"10px",
                padding:"8px 14px",
                border:"none",
                borderRadius:"6px",
                background:"#ff4500",
                color:"white",
                cursor:"pointer"
              }}
            >
              Comentario
            </button>

          </div>

        </div>

      ))}

    </div>

  );
}

export default Home;