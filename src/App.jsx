import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handleAddCaption = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setCaptions([
        ...captions,
        { time: currentTime.toFixed(2), text: currentCaption },
      ]);
      setCurrentCaption("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-slate-200 w-full rounded-xl border-black shadow-2xl to-blue-800 mt-4">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        <span className="text-red-600">Play</span>{" "}
        <span className="text-gray-900">Your </span>Video
      </h1>
      <div className="mb-4 ">
        <p className="mb-1 text-center text-blue-600">Paste your URL Below :</p>
        <input
          type="text"
          placeholder="Enter video URL (must be a .mp4, .webm, or .ogg file)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border shadow-xl p-2 w-full mb-3 rounded-lg"
        />
        <video
          controls
          className="w-full"
          ref={videoRef}
          onTimeUpdate={() => {
            const currentTime = videoRef.current.currentTime;
            setCurrentTime(currentTime.toFixed(2));
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          browser does not support the video.
        </video>
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Enter your caption"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)}
          className="border p-2 w-full mb-2 rounded-lg bg-zinc-900 text-white shadow-lg"
        />

        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Timestamp (seconds)"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            className="border p-2 w-full mr-2 rounded-lg shadow-xl"
          />

          <button
            onClick={handleAddCaption}
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 hover:shadow-lg dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
          >
            Add Caption
          </button>
        </div>
      </div>
      <div className="w-full h-auto py-4 bg-slate-300 px-4 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Added Captions :</h2>
        <ul className="list-disc pl-4">
          {captions.map((caption, index) => (
            <li key={index}>
              <strong className="text-pink-900">{caption.time} sec : </strong>{" "}
              {caption.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
