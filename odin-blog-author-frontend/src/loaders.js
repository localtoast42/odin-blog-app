const API_URL = "http://localhost:3000/api/v1";

export async function postLoader({ params }) {
    const response = await fetch(`${API_URL}/posts/${params.postId}`, { mode: "cors" });
    const post = await response.json();
    return { post };
}

export async function postContainerLoader() {
    const response = await fetch(`${API_URL}/posts/`, { mode: "cors" });
    const posts = await response.json();
    return { posts };
}