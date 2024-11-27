import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchAllCategories } from "../services/Auth";
import { removeCategory } from "../slices/CategorySlice";
import { Dialog, DialogTitle, Rating, Typography } from '@mui/material';
import { updateEditCategory } from "../slices/CategorySlice";
import { UpdateCategory } from "../services/Auth";

const axios = require('axios');


const CategoryActions = () => {
    const { allCategories } = useSelector((state) => state.category)
    const [a, seta] = useState([])
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const [editCategory, setEditCategory] = useState("");
    const [EditCategoryId, setEditCategoryId] = useState("")
    const demo = async () => {
        const url = 'https://edamam-recipe-search.p.rapidapi.com/search?q=chicken';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '62e92c8375mshf98b6e1914fb3c2p1f5db2jsn254cb9eac568',
                'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result);
            seta(result);
            console.log(a)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        demo()
        fetchAllCategories(dispatch)
        console.log(allCategories)
    }, [])
    const handleFormSubmit = (e) => {
        e.preventDefault()
        UpdateCategory(editCategory, EditCategoryId, dispatch)
        dispatch(updateEditCategory([EditCategoryId, editCategory]))
        setEditCategoryId("");
        setEditCategory("")
    }
    return (
        <div className=" w-[80%] overflow-x-hidden overflow-y-auto bg-transparent opacity-95">

            <div class="flex flex-col w-full">
                <div class="w-full">
                    {/* <p className="text-white text-2xl font-bold font-inter ml-[1.23em]">Customers</p>
                    <p className=" text-richblue-2 mt-[0.49em] font-inter text-xl ml-[1.49em] font-semibold mb-[0.63em]">List Of Customers</p> */}
                    <div class="">
                        <table className="w-full ">
                            <thead class="bg-gray-50 text-richblack-25">
                                <tr>
                                    <th class="px-6 py-2 text-2xl  border-collapse border-dashed border-2 border-richblack-5 border-l-0 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        ID
                                    </th>
                                    <th class="px-6 py-2 text-2xl  border-collapse border-dashed border-2 border-richblack-5 border-t-0 text-gray-500 font-semibold font-inter text-left">
                                        Category Name
                                    </th>
                                    <th class="px-6 py-2 text-2xl  border-collapse border-dashed border-2 border-richblack-5 border-t-0 border-r-0 text-gray-500 font-semibold font-inter text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-transparent  text-richblack-5">
                                {
                                    allCategories.length > 0 ? allCategories.map((category) => {
                                        return (
                                            <tr className="whitespace-nowrap" key={category._id}>
                                                <td className="px-6 py-4 text-lg font-medium border-collapse border-dashed border-2  border-richblack-5 border-l-0 border-b-0 ">
                                                    {category?._id}
                                                </td>
                                                <td className="px-6 text-lg font-medium py-4 tracking-wider border-collapse border-dashed border-2  border-richblack-5 border-b-0 ">
                                                    {category?.categoryName}
                                                </td>
                                                <td className="px-6 py-4 border-collapse border-dashed border-2  border-richblack-5 border-r-0 border-b-0 ">
                                                    <button className=" mx-[1.23em] shadow-sm shadow-richblack-5 w-[40%] " onClick={() => {
                                                        setOpen(true);
                                                        setEditCategory(category?.categoryName)
                                                        setEditCategoryId(category?._id)
                                                    }}>Edit</button>
                                                    <button className="mx-[1.23em] shadow-sm shadow-richblack-5 w-[40%] " onClick={(e) => { dispatch(removeCategory(category._id)); deleteCategory(dispatch, category._id) }} >Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <div>
                                            Loading..
                                        </div>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle fontWeight={"bold"} fontSize={"23px"} textAlign={"center"}>Edit Category</DialogTitle>
                <form className='flex flex-col items-center justify-center h-[30vh] w-[40vh] m-[1.34em]' onSubmit={handleFormSubmit}>
                    <input type="text" className="h-[6vh] w-[80%] border-richblack-800 rounded-md border-2" value={editCategory} onChange={(e) => { setEditCategory(e.target.value) }} />
                    <button onClick={() => setOpen(false)}>Save Changes</button>
                </form>
            </Dialog>
        </div>
    );
}

export default CategoryActions;