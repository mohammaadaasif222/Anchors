import Dialogue from './Dialogue'
export default function Header() {
  return (
    <header className="bg-[##101010]">
      <div className="w-full h-[76px] px-36 py-4 bg-stone-950 justify-between items-center inline-flex">
        <div className="w-[196px] h-[35px] relative">
          <img
            className="w-[22px] h-[22px] left-[22px] top-[6.50px] absolute origin-top-left rotate-180"
            src="https://res.cloudinary.com/mae-com-in/image/upload/v1701844768/imagelogo_oz9csm.png"
          />
          <div className="left-[36px] top-0 absolute text-white text-[28px] font-semibold font-['Sora']">
            anchors
          </div>
          <div className="w-[34px] h-4 px-1.5 py-0.5 left-[162px] top-0 absolute bg-stone-300 rounded justify-start items-start gap-2.5 inline-flex">
            <div className="text-neutral-800 text-[10px] font-normal font-['Inter']">
              Beta
            </div>
          </div>
        </div>
        <div className="justify-start items-start gap-5 flex">
          <div className="justify-start items-start gap-5 flex">
            <div className="px-5 py-2.5 rounded-[40px] border border-white border-opacity-0 justify-start items-center gap-2 flex">
              <div className="w-5 h-5 relative" />
              <div className="text-white text-opacity-0 text-xl font-normal font-['Inter'] leading-normal">
                <Dialogue/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}