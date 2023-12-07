import React, { useState } from "react";

const Form = ({ close, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message:
      "This email is sending by anchors assignment application developed by Mohammad Aasif",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("https://anchors-2mv7.onrender.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        console.log("Email sent successfully");
      } else {
        setSuccess(false);
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <div className="w-[480px] h-[396px] p-10 bg-zinc-800 rounded-[10px] flex-col justify-center items-center gap-5 inline-flex">
          <div className="w-20 h-20 relative" />
          <div className="flex-col justify-start items-center gap-7 flex">
            <div className="flex-col justify-start items-center gap-5 flex">
              <div className="flex-col justify-start items-center gap-4 flex">
                <img src="https://res.cloudinary.com/mae-com-in/image/upload/v1701930967/mdi_tick-circle-outline_s50wwv.svg" alt="succes"/>
                <div className="text-center text-white text-2xl font-medium font-['Inter']">
                  Request a call back{" "}
                </div>
              </div>
              <div className="flex-col justify-start items-center gap-2 flex">
                <div className="text-center text-white text-opacity-80 text-base font-normal font-['Inter'] leading-tight">
                  Our Team will call you shortly in <br />
                  12-24 hrs
                </div>
                <div className="text-center text-white text-opacity-80 text-base font-normal font-['Inter'] leading-tight">
                  Can’t you wait for call?
                </div>
              </div>
            </div>
            <button onClick={()=>close()} className="px-10 py-3 bg-red-600 rounded-[40px] shadow justify-center items-center gap-1 inline-flex">
              <div className="text-white text-xl font-normal font-['Inter']">
                Check another video
              </div>
              <div className="w-6 h-6 relative origin-top-left rotate-90">
                <div className="w-6 h-6 left-0 top-0 absolute"></div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[480px] h-[396px] p-10 bg-zinc-800 rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="flex-col justify-center items-center gap-10 flex">
            <div className="flex-col justify-start items-center gap-4 flex">
              <div className="text-center text-white text-2xl font-medium font-['Inter']">
                Request a call back{" "}
              </div>
            </div>
            <div className="flex-col justify-center items-center gap-7 flex">
              <div className="flex-col justify-start items-start gap-4 flex">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-[360px] bg-transparent px-5 text-neutral-500 py-[15px] rounded-[10px] border border-neutral-500 justify-start items-start gap-2.5 inline-flex"
                />

                <input
                  type="text"
                  name="number"
                  placeholder="Mobile Name"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-[360px] bg-transparent px-5 py-[15px] rounded-[10px] border border-neutral-500 justify-start items-start gap-2.5 inline-flex"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="px-10 py-3 bg-white rounded-[40px] shadow justify-start items-center gap-2.5 inline-flex relative"
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-400 opacity-50 rounded-[40px]"></div>
                )}
                <div className="text-black text-xl font-normal font-['Inter']">
                  {isLoading ? "Loading..." : "Request a Call Back"}
                </div>
              </button>
              <button
                className="text-slate-100 text-xs"
                onClick={() => close()}
              >
                close form
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
