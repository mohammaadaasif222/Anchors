import React, { useEffect } from "react";
import { FaEye, FaRegThumbsUp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const videoDetails = useSelector((state) => state.videoReducer.videoDetails);

  useEffect(() => {
    if (!videoDetails) {
      navigate("/");
    }
  }, [videoDetails, navigate]);

  if (!videoDetails) {
    return null; // You might want to render a loader or handle the absence of videoDetails differently
  }

  const {
    earnings,
    subscriberCount,
    comments,
    likes,
    views,
    title,
    thumbnail,
    uploadedOn,
  } = videoDetails;

  return (
    <div>
      <div className="w-full py-10 h-[359px]  bg-stone-950 justify-center items-center inline-flex">
        <div className="self-stretch px-10 py-5 bg-stone-900 rounded-2xl justify-start items-center gap-5 inline-flex">
          <div className="justify-start items-center gap-10 flex">
            <div className="justify-start items-center gap-5 flex">
              <div className="w-[254px] flex-col justify-start items-start gap-5 inline-flex">
                <div className="px-2 py-1 bg-neutral-500 rounded justify-start items-center gap-1 inline-flex">
                  <div className="w-6 h-6 relative" />
                  <div className="text-white text-base font-normal font-['Inter'] leading-tight">
                    Top earner video
                  </div>
                </div>
                <img
                  className="w-60 h-[135px] relative rounded-[10px]"
                  src={thumbnail || "https://via.placeholder.com/240x135"}
                />
                <div className="text-white text-opacity-50 text-base font-normal font-['Inter']">
                  Uploaded on - {uploadedOn}
                </div>
              </div>
              <div className="w-[255px] flex-col justify-start items-start gap-[11px] inline-flex">
                <div className="self-stretch h-[50px] text-white text-md font-medium font-['Inter']">
                  {title.substring(0,40)}
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <div className="justify-start items-center gap-2 inline-flex">
                    {/* <div className="w-6 h-6 relative" /> */}
                    <FaEye className="text-slate-100" />
                    <div className="text-white text-opacity-50 text-base font-normal font-['Inter']">
                      {views}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-2 inline-flex">
                    {/* <div className="w-6 h-6 relative" /> */}
                    <FaRegThumbsUp className="text-slate-100" />
                    <div className="text-white text-opacity-50 text-base font-normal font-['Inter']">
                      {likes}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-2 inline-flex">
                    <FaMessage className="text-slate-100" />
                    <div className="text-white text-opacity-50 text-base font-normal font-['Inter']">
                      {comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-10 bg-zinc-800 rounded-2xl flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="h-[120px] flex-col justify-start items-center gap-6 flex">
                <div className="justify-start items-center inline-flex">
                  <div className="w-10 h-10 pl-[9.50px] pr-[9.41px] py-1 justify-center items-center flex">
                    <div className="w-[21.09px] h-8 relative flex-col justify-start items-start flex" />
                  </div>
                  <div className="text-white text-[40px] font-bold font-['Inter']">
                    $ {earnings}
                  </div>
                </div>
                <div className="h-12 px-6 py-[18px] bg-white rounded-[35px] justify-center items-center gap-2.5 inline-flex">
                  <div className="text-neutral-900 text-base font-normal font-['Inter']">
                    Check How?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-center text-opacity-70 text-xl font-medium font-['Inter'] leading-7">
        Other Videos Potentials
      </div>
      <div
        className="relative overflow-x-auto m-auto py-10 rounded-md"
        style={{ width: "75%" }}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-white capitalize bg-stone-900  text-base font-bold dark:bg-gray-700 dark:text-gray-400">
            <tr className="mb-2">
              <th scope="col" className="px-6 py-5">
                Rank
              </th>
              <th scope="col" className="px-6 py-5">
                Title
              </th>
              <th scope="col" className="px-6 py-5">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-5">
                Views
              </th>
              <th scope="col" className="px-6 py-5">
                Likes
              </th>
              <th scope="col" className="px-6 py-5">
                Comments
              </th>
              <th scope="col" className="px-6 py-5">
                Uploaded On
              </th>
              <th scope="col" className="px-6 py-5">
                *Estimate Earnings
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" text-white bg-stone-800  border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-10 text-white whitespace-nowrap dark:text-white text-opacity-80 text-base font-normal font-['Inter']"
              >
                89
              </th>
              <td className="px-6 py-4">{title.substring(0,5)}</td>
              <td className="px-6 py-4">
                <img
                  className="w-20 h-20"
                  src={thumbnail || "https://via.placeholder.com/240x135"}
                />
              </td>
              <td className="px-6 py-4">{views}</td>
              <td className="px-6 py-4">{likes}</td>
              <td className="px-6 py-4">{comments}</td>
              <td className="px-6 py-4">{uploadedOn}</td>
              <td className="px-6 py-4">{earnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
