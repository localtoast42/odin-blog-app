import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export async function userLoader() {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${API_URL}/users/self`, { 
        mode: "cors",
        headers: { 'Authorization': token }
    });

    if (response.status == 401) {
        return redirect('/login')
    }
    
    const user = await response.json();

    return { user };
}

export async function postLoader({ params }) {
    const token = localStorage.getItem("jwt");

    const [postResponse, commentsResponse] = await Promise.all([
        fetch(`${API_URL}/posts/${params.postId}`, { 
            mode: "cors", 
            headers: { 'Authorization': token }
        }),
        fetch(`${API_URL}/posts/${params.postId}/comments`, { 
            mode: "cors",
            headers: { 'Authorization': token }
        })
    ])
    const post = await postResponse.json();
    const comments = await commentsResponse.json();

    return { post, comments };
}

export async function postContainerLoader() {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${API_URL}/posts/`, { 
        mode: "cors", 
        headers: { 'Authorization': token }
    });

    const posts = await response.json();
    return { posts };
}