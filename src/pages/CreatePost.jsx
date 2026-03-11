import { useState } from "react";
import { supabase } from "../supabaseClient";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("post")
        .upload(fileName, image);

      if (uploadError) {
        console.log(uploadError);
        return;
      }

      const { data } = supabase.storage
        .from("post")
        .getPublicUrl(uploadData.path);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          author: "Carlos",
          image: imageUrl,
          votes: 0
        }
      ]);

    if (error) {
      console.log(error);
    } else {
      window.location = "/";
    }
  };

  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      marginTop:"40px",
      fontFamily:"Arial"
    }}>

      <form
        onSubmit={createPost}
        style={{
          width:"500px",
          background:"white",
          padding:"30px",
          borderRadius:"12px",
          boxShadow:"0px 4px 12px rgba(0,0,0,0.1)"
        }}
      >

        <h2 style={{marginBottom:"20px"}}>
          Create Post
        </h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"15px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"15px",
            borderRadius:"6px",
            border:"1px solid #ccc",
            height:"120px"
          }}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{marginBottom:"20px"}}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            padding:"12px",
            border:"none",
            borderRadius:"8px",
            background:"#ff4500",
            color:"white",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >
          Create Post
        </button>

      </form>

    </div>
  );
}

export default CreatePost;