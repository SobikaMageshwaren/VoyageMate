import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TravelBlog.css';

const TravelBlog = () => {
    const [blogs, setBlogs] = useState([
        {
            title: "Exploring the Majestic Mountains",
            image: "/images/mountain.jpg",
            description: "There’s something about the mountains that just calls to me. The fresh air, the breathtaking views, and the thrill of adventure make every hike worthwhile."
        },
        {
            title: "Beach Bliss: A Perfect Getaway",
            image: "/images/beach.jpg",
            description: "The beach is my ultimate escape. With soft sand under my feet and the sound of waves crashing, it’s the perfect place to unwind and recharge."
        }
    ]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // Fetch blogs from backend on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5003/api/blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    const handleAddOrUpdateBlog = async () => {
        if (title && description) {
            setLoading(true);
            setTimeout(async () => {
                const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "/images/default-image.jpg";
                const blogData = { title, description, image: imageUrl };

                try {
                    let response;
                    if (editingIndex !== null) {
                        // Update blog
                        response = await fetch(`http://localhost:5003/api/blogs/${blogs[editingIndex]._id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(blogData),
                        });
                        const updatedBlog = await response.json();
                        const updatedBlogs = blogs.map((blog, index) =>
                            index === editingIndex ? updatedBlog : blog
                        );
                        setBlogs(updatedBlogs);
                        setEditingIndex(null);
                    } else {
                        // Add new blog
                        response = await fetch('http://localhost:5003/api/blogs', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(blogData),
                        });
                        const newBlog = await response.json();
                        setBlogs([...blogs, newBlog]);
                    }
                    setLoading(false);
                    setTitle('');
                    setDescription('');
                    setImageFile(null);
                    setShowForm(false);
                } catch (error) {
                    console.error('Error saving blog:', error);
                }
            }, 3000);
        } else {
            alert("Please fill in all fields!");
        }
    };

    const handleEditBlog = (index) => {
        const blogToEdit = blogs[index];
        setTitle(blogToEdit.title);
        setDescription(blogToEdit.description);
        setImageFile(null);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDeleteBlog = async (index) => {
        try {
            await fetch(`http://localhost:5003/api/blogs/${blogs[index]._id}`, {
                method: 'DELETE',
            });
            const newBlogs = blogs.filter((_, i) => i !== index);
            setBlogs(newBlogs);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImageFile(null);
        setShowForm(false);
    };

    return (
        <div className="blog-container">
            <Link to="/booking" className="booking-button">Booking</Link>
            <h2>My Travel Blog</h2>
            <div className="blog-list">
                {blogs.map((blog, index) => (
                    <div className="blog-post" data-index={index} key={index}>
                        <h3 className="blog-title">{blog.title}</h3>
                        <img src={blog.image} alt={blog.title} className="blog-image" />
                        <p className="blog-description">{blog.description}</p>
                        <div>
                            <button onClick={() => handleEditBlog(index)} className="edit-button">Edit</button>
                            <button onClick={() => handleDeleteBlog(index)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => setShowForm(!showForm)} className="create-blog-button">
                {showForm ? "Cancel" : "Create Blog"}
            </button>
            {showForm && (
                <div className="create-blog-form">
                    <input 
                        type="text" 
                        placeholder="Add Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Add Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <button onClick={handleAddOrUpdateBlog}>
                        {editingIndex !== null ? "Update Blog" : "Add Blog"}
                    </button>
                    {loading && <div className="loading-spinner">Loading...</div>}
                </div>
            )}
        </div>
    );
};

export default TravelBlog;
