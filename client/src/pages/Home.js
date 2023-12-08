import React, { useState } from "react";
import { fetchVideoDetails } from "../redux/videoSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const simulateProgress = () => {
    let count = 1;
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          dispatch(fetchVideoDetails(videoUrl))
            .then(() => {
              navigate("/result");
            })
            .catch((error) => {
              console.error("Error fetching video details:", error);
              // Handle error if needed
            });
          return 100;
        }
        if (count <= 50) {
          count++;
        }
        return prevProgress + count;
      });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(videoUrl!==""){
    simulateProgress();
    setVideoUrl("");
    }else{
      return alert("enter the url first");
    }
  };

  return (
    <div className="w-full flex py-10">
      <div className="w-[713px] m-auto h-[348px] flex-col justify-start items-start gap-[60px] inline-flex">
        <div className="h-60 flex-col justify-start items-center gap-6 flex">
          <div className="w-[741px] text-center text-white text-[50px] font-bold font-['Inter'] leading-[72px]">
            Discover your earning potential
          </div>
          <div className="text-center text-white text-opacity-80 text-2xl font-normal font-['Inter'] leading-9">
            Turn your Youtube expertise into a lucrative income
            <br />
            through resource sharing
          </div>
        </div>
        <div className="w-[713px] justify-start items-center gap-5 inline-flex">
          {progress > 0 && progress < 100 ? (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                className="bg-green-600 h-2.5 rounded-full dark:bg-green-500 text-white"
                style={{ width: `${progress}%` }}
              >
                fething data...{progress}%
              </div>
            </div>
          ) : (
            <>
              <div className="w-6 h-6 relative">
                <img
                  src="https://res.cloudinary.com/mae-com-in/image/upload/v1701847891/mdi_youtube_mlolmx.svg"
                  alt="yt"
                />
              </div>

              <input
                className="grow bg-transparent  text-slate-700 focus:ring-black w-full shrink basis-0 h-12 px-[39px] py-3 rounded-full border border-slate-500 border-opacity-50 justify-start items-center gap-2.5 flex"
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter youtube link here"
                  required 
              />

              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-red-800 font-medium rounded-full  text-sm px-5 py-4 text-center me-2 mb-2"
              >
                Check Earning
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
