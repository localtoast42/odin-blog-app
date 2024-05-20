import { redirect } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

export async function userLoader() {
    const response = await fetch(`${API_URL}/users/self`, { 
        mode: "cors",
        credentials: "include"  
    });

    if (response.status == 401) {
        return redirect('/login')
    }
    
    const user = await response.json();

    return { user };
}

export async function postLoader({ params }) {
    const [postResponse, commentsResponse] = await Promise.all([
        fetch(`${API_URL}/posts/${params.postId}`, { mode: "cors", credentials: 'include' }),
        fetch(`${API_URL}/posts/${params.postId}/comments`, { mode: "cors" })
    ])
    const post = await postResponse.json();
    const comments = await commentsResponse.json();

    return { post, comments };
}

export async function postContainerLoader() {
    const response = await fetch(`${API_URL}/posts/`, { mode: "cors", credentials: 'include' });
    const posts = await response.json();
    return { posts };
}