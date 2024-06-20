import React, { useEffect, useState } from 'react';
import axios from './api/DkvApi'; // Assuming axios instance is configured correctly
import './App.css';
import DkvCategoryList from './components/DkvCategoryList';
import DkvCategoryForm from './components/DkvCategoryForm';

function DkvApp() {
  const [dkvCategories, setdkvCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Function to fetch categories from API
  const dkvGetCategories = async () => {
    try {
      const dkvCateResponse = await axios.get('/dkvCategory');
      setdkvCategories(dkvCateResponse.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Function to add a new category
  const dkvAddCategory = async (newCategory) => {
    try {
      const response = await axios.post('/dkvCategory', newCategory);
      setdkvCategories([...dkvCategories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Function to update an existing category
  const dkvUpdateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(`/dkvCategory/${updatedCategory.dkvId}`, updatedCategory);
      setdkvCategories(dkvCategories.map(cat => cat.dkvId === updatedCategory.dkvId ? response.data : cat));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Function to delete a category
  const dkvDeleteCategory = async (dkvId) => {
    try {
      await axios.delete(`/dkvCategory/${dkvId}`);
      setdkvCategories(dkvCategories.filter(cat => cat.dkvId !== dkvId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    dkvGetCategories();
  }, []);

  return (
    <div className="container border my-3">
      <h1>Do Khac Viet - Call API</h1>
      <DkvCategoryList
        renderdkvCategories={dkvCategories}
        onDelete={dkvDeleteCategory}
        onEdit={setEditingCategory}
      />
      <hr />
      <DkvCategoryForm
        onAdd={dkvAddCategory}
        onEdit={dkvUpdateCategory}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
    </div>
  );
}

export default DkvApp;
