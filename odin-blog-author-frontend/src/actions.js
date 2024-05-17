import { redirect } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

export async function postCreateAction() {
    const post = await fetch(`${API_URL}/posts/`, { method: 'POST' });

    return redirect(`/posts/${post.id}`);
}

export async function postUpdateAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const newPost = {
        id: params.postId,
        title: updates.title,
        text: updates.text,
    };

    if (updates.publish) {
        newPost.isPublished = true;
    }

    await fetch(`${API_URL}/posts/${params.postId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    });

    return redirect(`/posts/${params.postId}`);
}