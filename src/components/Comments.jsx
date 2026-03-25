import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Comments({ postId, currentUser }) {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setComments(data);
  };

  const addComment = async () => {

    if (!text.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: postId,
          content: text,
          author: currentUser?.username || "anon"
        }
      ]);

    if (error) {
      console.error(error);
      return;
    }

    setText("");
    loadComments();
  };

  return (

    <div className="mt-4">

      <div className="flex gap-2 mb-3">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un comentario"
          className="border p-2 flex-1 rounded"
        />

        <button
          onClick={addComment}
          className="bg-gray-200 px-3 rounded"
        >
          Comentar
        </button>

      </div>

      {comments.map((c) => (

        <div key={c.id} className="text-sm border-t pt-2 mb-2">

          <b>{c.author}</b>

          <p>{c.content}</p>
          

        </div>

      ))}

    </div>

  );
}