import React, { useState, useEffect } from "react";
import "./CommentTable.css";


function CommentsTable() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const video1Response = await fetch(
          `http://localhost:5000/comments/o5MutYFWsM8`
        );
        const video1Data = await video1Response.json();
        const video2Response = await fetch(
          `http://localhost:5000/comments/aQguO9IeQWE`
        );
        const video2Data = await video2Response.json();
        const comments = [...video1Data, ...video2Data];
        setComments(comments);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, []);

  return (
    <div>
      <h2>YouTube Comments</h2>
      <table className="my-table">
        <thead>
          <tr>
            <th className="table-header">Author</th>
            <th className="table-header">Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </td>
              <td>{comment.snippet.topLevelComment.snippet.textDisplay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentsTable;
