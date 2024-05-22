import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    const response = await fetch(`${API_URL}/login`, { 
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) 
    });

    if (response.status == 401) {
        return redirect('/login');
    } else {
        const responseData = await response.json();
        localStorage.setItem("jwt", responseData.token);
        return redirect('/');
    }

}

export async function logoutAction() {
    localStorage.removeItem("jwt");

    return redirect('/login');
}

export async function postCreateAction() {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${API_URL}/posts/`, { 
        method: 'POST',
        headers: { 'Authorization': token }
    });
    const post = await response.json();

    return redirect(`/posts/${post._id}/edit`);
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

    const token = localStorage.getItem("jwt");

    await fetch(`${API_URL}/posts/${params.postId}`, { 
        method: 'PUT', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify(newPost)
    });

    return redirect(`/posts/${params.postId}`);
}

export async function postDeleteAction({ params }) {
    const token = localStorage.getItem("jwt");

    await fetch(`${API_URL}/posts/${params.postId}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': token }
    });
    
    return redirect("/");
}

export async function commentCreateAction({ request, params }) {
    const formData = await request.formData();
    const comment = Object.fromEntries(formData);

    const token = localStorage.getItem("jwt");

    await fetch(`${API_URL}/posts/${params.postId}/comments/`, { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token,
        },
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

    const token = localStorage.getItem("jwt");

    await fetch(`${API_URL}/posts/${params.postId}/comments/${params.commentId}`, { 
        method: 'PUT', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(newComment)
    });

    return redirect(`/posts/${params.postId}`);
}

export async function commentDeleteAction({ params }) {
    const token = localStorage.getItem("jwt");

    await fetch(`${API_URL}/posts/${params.postId}/comments/${params.commentId}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': token },
    });
    
    return redirect(`/posts/${params.postId}`);
}