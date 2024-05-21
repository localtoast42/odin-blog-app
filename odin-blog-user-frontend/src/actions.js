import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginAction() {
    await fetch(`${API_URL}/login`, { method: 'POST' });

    return redirect('/');
}

export async function logoutAction() {
    await fetch(`${API_URL}/logout`, { method: 'POST' });

    return redirect('/login');
}

export async function commentCreateAction({ request, params }) {
    const formData = await request.formData();
    const comment = Object.fromEntries(formData);

    await fetch(`${API_URL}/posts/${params.postId}/comments/`, { 
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    return redirect(`/posts/${params.postId}`);
}

export async function commentUpdateAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const newComment = {
        id: params.commentId,
        text: updates.text,
    };

    await fetch(`${API_URL}/posts/${params.postId}/comments/${params.commentId}`, { 
        method: 'PUT', 
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    });

    return redirect(`/posts/${params.postId}`);
}

export async function commentDeleteAction({ params }) {
    await fetch(`${API_URL}/posts/${params.postId}/comments/${params.commentId}`, { 
        method: 'DELETE', 
        credentials: 'include'
    });
    
    return redirect(`/posts/${params.postId}`);
}