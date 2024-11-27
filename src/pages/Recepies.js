import { useState, useEffect } from "react";
import CookingBanner from "../components/CookingBanner"
import { apiConnector } from "../services/apiConnector";
import { useSelector } from "react-redux";
import axios from "axios";
import MealInfo from "../components/MealInfo";
import RandomMealInfo from "../components/RandomMealInfo";

export default function Recepies() {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "", tag: ""
    })

    const [allMeals, setAllMeals] = useState([]);

    const url1 = 'https://low-carb-recipes.p.rapidapi.com/search?maxPrepareTime=10&maxCalories=500&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10';
    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4482349acamsh672397583358332p137b8djsn0ffeb221306e',
            'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await fetch(url1, options1);
            const result = await response.json();
            console.log(result);
            setAllMeals(result)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMeals()
        setLoading(false);
    }, [])
    function changeHandler(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        console.log('formdata is :');
        console.log(formData)

    }

    const submitHandler2 = async (e) => {
        e.preventDefault();
        let url="";
        if( formData.name != "" && formData.tag!= ""){
            url = `https://low-carb-recipes.p.rapidapi.com/search?name=${formData.name}&tags=${formData.tag}`;
        }
        else if(formData.name!=""){
            url=`https://low-carb-recipes.p.rapidapi.com/search?name=${formData.name}`;
        }
        else{
            url=`https://low-carb-recipes.p.rapidapi.com/search?tags=${formData.tag}`;
        }
        try{
            const res = await fetch(url , options1);
            const data = await res.json();
            console.log('Your response is : ')
            console.log(data)
            setAllMeals(data);
        }
        catch(error){
            console.log('something went wrong : ',error);
        }
    }
    const tags = [
        "15-minute-meals",
        '3-ingredient-meals',
        '5-ingredient-meals',
        'appetizer',
        'beef-free',
        'beverages',
        'breakfast',
        'chicken-free',
        'dairy-free',
        'desserts',
        'egg-free',
        'eggs',
        'fish',
        'fish-free',
        'freezer-friendly',
        'french',
        'gluten-free',
        'grains',
        'high-protein',
        'keto',
        'kid-friendly',
        'lchf',
        'low-carb',
        'lunch',
        'main-dishes',
        'meal-plan-ok',
        'msg',
        'no-cooking-required',
        'one-pot-meals',
        'paleo',
        'pantry-recipes',
        'peanut-free',
        'peanuts',
        'pescatarian',
        'pork-free',
        'quick-easy',
        'salads',
        'sheet-pan-dinners',
        'shellfish',
        'shellfish-free',
        'sides',
        'skillet',
        'snacks',
        'soy-free',
        'sulphites',
        'tree-nut-free',
        'vegan',
        'vegetarian',
        'wheat-free',
        'whole-30']

    return (

        <div className=" h-[100vh] w-[100vw] flex flex-wrap gap-4 ">

            <CookingBanner />
            {/* <h1 className=" text-4xl mt-2 font-semibold w-full mx-auto text-center">Recepies Page </h1> */}
            <div className=" w-[15vw]  flex flex-col border-[2px] border-richblack-600 rounded-tr-xl  ">
                <form onSubmit={submitHandler2} className="flex flex-col gap-4 mt-4">
                    <input type="text" name="name" placeholder="Enter Recepie name " onChange={changeHandler} className="w-[95%]" />
                    <div className=" w-full flex gap-1 p-1">
                        <div>
                            <label htmlFor="ingredients" type="text" className="w-full text-center " >Search by Tags</label>
                        </div>
                        <div>
                            <select id="ingredients" name="tag" onChange={changeHandler} className=" w-[90%] border-l-yellow-100 " >
                                {
                                    tags.map((tag, index) => {
                                        return (
                                            <option key={index} value={tag}>{tag}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className=" w-[80%] h-[20%] mx-auto my-auto bg-[#4881dc] text-white rounded-xl border-[5px]  border-[#4881dc] ">
                        <button className=" w-full font-medium text-lg ">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className=" h-[70%] w-[80%] mx-auto flex flex-wrap gap-4 justify-center items-center overflow-scroll " >
                {
                    allMeals.length > 0 ? (
                        allMeals.map((meal) => {
                            return (
                                <RandomMealInfo meal={meal} key={meal.index} />
                            );
                        })
                    ) : (
                        <div>
                            Loading...
                        </div>
                    )
                }

            </div>

        </div>
    )
}
