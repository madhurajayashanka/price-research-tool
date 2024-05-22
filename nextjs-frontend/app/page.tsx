'use client';

import { useState } from 'react';
import Axios from 'axios';
import AdCard from '../components/AdCard';
import { Spinner } from "@material-tailwind/react";


export default function Home() {

  const API = "http://127.0.0.1:5000"
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [ads, setAds] = useState();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { value: '', label: 'Select a category' },
    { value: 'Mobile-Phones', label: 'Mobile Phones' },
    { value: 'Computers-&-Tablets', label: 'Computers & Tablets' },
    { value: 'Computer-Accessories', label: 'Computer Accessories' },
    { value: 'Mobile-Phone-Accessories', label: 'Mobile Phone Accessories' },
    { value: 'Electronic-Home-Appliances', label: 'Electronic Home Appliances' },
    { value: 'Audio-&-MP3', label: 'Audio & MP3' },
    { value: 'Other-Electronics', label: 'Other Electronics' },
    { value: 'TVs', label: 'TVs' },
    { value: 'Air-Conditions-&-Electrical-Fittings', label: 'Air Conditions & Electrical Fittings' },
    { value: 'Cameras-&-Camcorders', label: 'Cameras & Camcorders' },
    { value: 'TV-&-Video-Accessories', label: 'TV & Video Accessories' },
    { value: 'Video-Games-&-Consoles', label: 'Video Games & Consoles' }
  ]);

  const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e:any) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    if (!inputValue || !selectedOption) {
      alert("Please fill in all fields.");
      return;
    }
   try {
    const response = await Axios.get(API+'/search_ads', {
      params: {
        inputValue,
        selectedOption,
      }
    });
    console.log(response.data);
    setAds(response.data);
  } catch (error) {
    console.error(error);
    alert("Please Select the right category.")
  }
    setLoading(false);
  };

  
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 max-w-screen-md">
        <h1 className="text-3xl font-bold mb-4 flex justify-center">{inputValue.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputValue"
            >
              Input Field
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputValue"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter some text"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="selectOption"
            >
              Select Option
            </label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="selectOption"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-right mb-4"> {/* Wrapper div for right alignment */}
            <button
              disabled={!selectedOption} // Disable button until category is selected
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>

          </div>
        </form>

        {loading && (
  <div className="flex justify-center items-center ">
    <Spinner color="blue" className="h-20 w-20" />
  </div>
)}
        {!loading && ads && (
          <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <h1 className='font-extrabold flex justify-center'>Ad Listings</h1>
          
          <div className="flex flex-wrap -mx-4">
            {ads && <AdCard ad={ads} />}
          </div>
        </div>
        )}



      </div>
      <footer className="bg-gray-200 text-center py-4 fixed bottom-0 w-full">
 | <a href="https://www.linkedin.com/in/madhurajayashanka/" target="_blank" rel="noopener noreferrer"> Made with ❤️ by Madhura Jayashanka</a> | © 2024
</footer>

    </div>
  );
}