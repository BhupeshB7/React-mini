// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const UserTask = () => {
//     const [videos, setVideos] = useState([]);
//     const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//     // const [currentTime, setCurrentTime] = useState(0);
//     // const [timerId, setTimerId] = useState(null);
//     // const [isPaused, setIsPaused] = useState(false);
//     // const [isTaskComplete, setIsTaskComplete] = useState(false);
//     // const [wallet, setWallet] = useState(0);

//     // Fetch videos from server
//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const res = await axios.get('https://gspbackend.onrender.com/api/task/tasks');
//                 setVideos(res.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         fetchVideos();
//     }, []);

//     // Handle video player events

//     const vidoRef = useRef(null);

//     const [currentTime, setCurrentTime] = useState(0);
//     const [timestamps, setTimestamps] = useState([]);
  
//     // function to handle time update of video
//     const handleTimeUpdate = (e) => {
//       const time = vidoRef.currentTime;
//       setCurrentTime(time);
//     };
  
//     // function to add timestamp to list
//     const addTimestamp = () => {
//       setTimestamps([...timestamps, currentTime]);
//     };
  

// // Render video player
// return (
//     <div>
//         <h1>{videos[currentVideoIndex]?.title}</h1>
//         <iframe src={videos[currentVideoIndex]?.videoLink} title={videos[currentVideoIndex]?.title} height="360" width="380" onTimeUpdate={handleTimeUpdate}  controls />
//         <button onClick={addTimestamp}>Add Timestamp</button>
//       {timestamps.map((timestamp) => (
//         <div>{timestamp}</div>
//       ))}
//     </div>
// );
// }
// export default UserTask;
// import axios from 'axios';
// import React, { useEffect,  useState } from 'react';
// // import axios from 'axios';
// function UserTask({userID}) {


//   const [videos, setVideos] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [remainingTime, setRemainingTime] = useState(20);
//   const [isTaskComplete, setIsTaskComplete] = useState(false);
//   const [userId, setUserId] = useState("");

//   // Fetch the user ID from the server when the component mounts

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get("https://gspbackend.onrender.com/api/profile");
//         const { userId } = response.data;
//         setUserId(userId);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserId();
//   }, []);

//   // Fetch the videos from the server when the component mounts
//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch('https://gspbackend.onrender.com/api/task/tasks');
//       const videos = await response.json();
//       // Get watched videos from local storage or set them to an empty array
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       // Lock the watched videos
//       const lockedVideos = videos.map(video => ({
//         ...video,
//         locked: watchedVideos.includes(video._id)
//       }));
//       setVideos(lockedVideos);
//     }
//     fetchVideos();
//   }, []);
// // after completing the task

//   // Start the timer when the user clicks on the "Start" button
//   function handleStart() {
//     const intervalId = setInterval(() => {
//       setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
//     }, 1000);
//     setTimeout(() => {
//       clearInterval(intervalId);
//       setRemainingTime(20);
//       // Lock the current video after it has been watched
//       const updatedVideos = videos.map((video, index) => {
//         if (index === currentVideoIndex) {
//           return {
//             ...video,
//             watched: true,
//             locked: true
//           };
//         }
//         return video;
//       });
//       setVideos(updatedVideos);
//       // Save the watched video to local storage
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       watchedVideos.push(updatedVideos[currentVideoIndex]._id);
//       localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
//       setCurrentVideoIndex(prevIndex => prevIndex + 1);
//     }, 20000);
//   }

//   // Play the video when the user clicks on it
//   function handleVideoClick(videoIndex) {
//     const video = document.getElementById(`video-${videoIndex}`);
//     video.play();
//   }

// async function updateWallet() {
//   try {
//     const response = await axios.post(`https://gspbackend.onrender.com/api/updateWallet/${userId}`);
//     console.log(response.data);
//     alert("wallet Updated successfully!");
//   } catch (error) {
//     console.error(error);
//     alert('wallet not updated!');
//   }
// }
//   // Render the current video and remaining time
//   function renderCurrentVideo() {
//     const { _id, videoLink, title, locked } = videos[currentVideoIndex];
//     return (
//       <div>
//         <h2>{title}</h2>
//         <iframe id={`video-${currentVideoIndex}.`} title={_id} src={videoLink} onClick={() => handleVideoClick(currentVideoIndex)} />
//         {locked ? (
//           <p>This video is locked. Please watch the previous video first.</p>
//         ) : (
//           <div>
//             <button onClick={handleStart}>Start</button>
//             <p>Time remaining: {remainingTime} seconds</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Render the task complete message
//   function renderTaskComplete() {
//     return (
//       <div>
//         <h2>Task Complete!</h2>
//         <p>Your wallet has been credited with Rs. 30.</p>
//       </div>
//     );
//   }
//     // Check if the task is complete and update the user's wallet
//     useEffect(() => {
//       if (currentVideoIndex === videos.length && !isTaskComplete) {
//         updateWallet();
//         setIsTaskComplete(true);
//       }
//     }, [currentVideoIndex, isTaskComplete, videos.length]);
  

//   return (
//     <div>
//       {currentVideoIndex < videos.length ? renderCurrentVideo() : renderTaskComplete()}
//     </div>
//   );
// }
// export default UserTask;









// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function UserTask() {
//   const [videos, setVideos] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [remainingTime, setRemainingTime] = useState(20);
//   const [isTaskComplete, setIsTaskComplete] = useState(false);
//   const [userId, setUserId] = useState("");

// //   // Fetch the user ID from the server when the component mounts

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get("https://gspbackend.onrender.com/api/profile");
//         const { userId } = response.data;
//         setUserId(userId);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserId();
//   }, []);
//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch('https://gspbackend.onrender.com/api/task/tasks');
//       const videos = await response.json();
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       const lockedVideos = videos.map(video => ({
//         ...video,
//         locked: watchedVideos.includes(video._id)
//       }));
//       setVideos(lockedVideos);
//     }
//     fetchVideos();
//   }, []);

//   function handleStart() {
//     const intervalId = setInterval(() => {
//       setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
//     }, 1000);
//     setTimeout(() => {
//       clearInterval(intervalId);
//       setRemainingTime(20);
//       const updatedVideos = videos.map((video, index) => {
//         if (index === currentVideoIndex) {
//           return {
//             ...video,
//             watched: true,
//             locked: true
//           };
//         }
//         return video;
//       });
//       setVideos(updatedVideos);
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       watchedVideos.push(updatedVideos[currentVideoIndex]._id);
//       localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
//       setCurrentVideoIndex(prevIndex => prevIndex + 1);
//     }, 20000);
//   }

//   function handleVideoClick(videoIndex) {
//     const video = document.getElementById(`video-${videoIndex}`);
//     video.play();
//   }

//   async function updateWallet(userId) {
//     try {
//       const response = await axios.post(`https://gspbackend.onrender.com/api/updateWallet/${userId}`);
//       console.log(response.data);
//       alert("Wallet updated successfully!");
//     } catch (error) {
//       console.error(error);
//       alert('Wallet not updated!');
//     }
//   }

//   function renderCurrentVideo() {
//     const { _id, videoLink, title, locked } = videos[currentVideoIndex];
//     return (
//       <div>
//         <h2>{title}</h2>
//         <iframe id={`video-${currentVideoIndex}`} title={_id} src={videoLink} onClick={() => handleVideoClick(currentVideoIndex)} />
//         {locked ? (
//           <p>This video is locked. Please watch the previous video first.</p>
//         ) : (
//           <div>
//             <button onClick={handleStart}>Start</button>
//             <p>Time remaining: {remainingTime} seconds</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   function renderTaskComplete() {
//     return (
//       <div>
//         <h2>TaskCompleted!</h2>
// <p>Congratulations, you have completed the task!</p>
// <button onClick={() => updateWallet(userId)}>Update Wallet</button>
// </div>
// );
// }

// return (
// <div>
// {isTaskComplete ? renderTaskComplete() : renderCurrentVideo()}
// </div>
// );
// }

// export default UserTask;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function UserTask() {
//   const [videos, setVideos] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [remainingTime, setRemainingTime] = useState(20);
//   const [isTaskComplete, setIsTaskComplete] = useState(false);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get("https://gspbackend.onrender.com/api/profile");
//         const { userId } = response.data;
//         setUserId(userId);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch('https://gspbackend.onrender.com/api/task/tasks');
//       const videos = await response.json();
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       const lockedVideos = videos.map(video => ({
//         ...video,
//         locked: watchedVideos.includes(video._id)
//       }));
//       setVideos(lockedVideos);
//     }
//     fetchVideos();
//   }, []);

//   function handleStart() {
//     const intervalId = setInterval(() => {
//       setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
//     }, 1000);
//     setTimeout(() => {
//       clearInterval(intervalId);
//       setRemainingTime(20);
//       const updatedVideos = videos.map((video, index) => {
//         if (index === currentVideoIndex) {
//           return {
//             ...video,
//             watched: true,
//             locked: true
//           };
//         }
//         return video;
//       });
//       setVideos(updatedVideos);
//       const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
//       watchedVideos.push(updatedVideos[currentVideoIndex]._id);
//       localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
//       setCurrentVideoIndex(prevIndex => prevIndex + 1);
//     }, 20000);
//   }

//   async function updateWallet(userId) {
//     try {
//       const response = await axios.post(`https://gspbackend.onrender.com/api/updateWallet/${userId}`);
//       console.log(response.data);
//       alert("Wallet updated successfully!");
//     } catch (error) {
//       console.error(error);
//       alert('Wallet not updated!');
//     }
//   }

//   function renderCurrentVideo() {
//     const { _id, videoLink, title, locked } = videos[currentVideoIndex];
//     return (
//       <div>
//         <h2>{title}</h2>
//         <iframe id={`video-${currentVideoIndex}`} title={_id} src={videoLink} />
//         {locked ? (
//           <p>This video is locked. Please watch the previous video first.</p>
//         ) : (
//           <div>
//             <button onClick={handleStart}>Start</button>
//             <p>Time remaining: {remainingTime} seconds</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   function renderTaskComplete() {
//     return (
//       <div>
//         <h2>TaskCompleted!</h2>
//         <p>Congratulations, you have completed the task!</p>
//         <button onClick={() => updateWallet(userId)}>Update Wallet</button>
//       </div>
//     );
//   }

//   useEffect(() => {
//     if (currentVideoIndex === videos.length) {
//       setIsTaskComplete(true);
//     }
//   }, [currentVideoIndex, videos.length]);

//   return (
//     <div>
//       {isTaskComplete ? (
//         renderTaskComplete()
//       ) : (
//         renderCurrentVideo()
//         )}
//         </div>)

//       }
        
//         export default UserTask;
     










import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserTask() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(20);
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const response = await fetch('https://gspbackend.onrender.com/api/users/profile', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const { userId } = response.data;
  //       setUserId(userId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUserId();
  // }, [token]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('https://gspbackend.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setData(data);
        const userId = data?.userId;
        if (userId) {
          setUserId(userId);
        } else {
          throw new Error('User ID is missing from response data');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, [token]);
  
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('https://gspbackend.onrender.com/api/task/tasks');
        const videos = await response.json();
        const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
        const lockedVideos = videos.map(video => ({
          ...video,
          locked: watchedVideos.includes(video._id)
        }));
        setVideos(lockedVideos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideos();
  }, []);

  function handleStart() {
    const intervalId = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setRemainingTime(20);
      const updatedVideos = videos.map((video, index) => {
        if (index === currentVideoIndex) {
          return {
            ...video,
            watched: true,
            locked: true
          };
        }
        return video;
      });
      setVideos(updatedVideos);
      const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
      watchedVideos.push(updatedVideos[currentVideoIndex]._id);
      localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
    }, 20000);
  }

  async function updateWallet(userId) {
    try {
      const response = await axios.post(`https://gspbackend.onrender.com/api/updateWallet/${userId}`);
      console.log(response.data);
      alert("Wallet updated successfully!");
    } catch (error) {
      console.error(error);
      alert('Wallet not updated!');
    }
  }

  function renderCurrentVideo() {
    if (videos.length === 0) {
      return <div>Loading...</div>;
    }
    const { _id, videoLink, title, locked } = videos[currentVideoIndex];
    return (
      <>
      {token && data &&data.is_active ?(
        <div>
        <h2>{title}</h2>
        <iframe id={`video-${currentVideoIndex}`} title={title} src={videoLink} />
        {locked ? (
          <p>This video is locked. Please watch the previous video first.</p>
        ) : (
          <div>
            <button onClick={handleStart}>Start</button>
            <p>Time remaining: {remainingTime} seconds</p>
          </div>
        )}
      </div>
      ):(
    <>
    <h3></h3>
    </>
      )}
      
  </>
    );
  }

  function renderTaskComplete() {
    return (
      <div>
        <h2>TaskCompleted!</h2>
        <p>Congratulations, you have completed the task!</p>
        <button onClick={() => updateWallet(userId)}>Update Wallet</button>
      </div>
    );
  }

  useEffect(() => {
    if (currentVideoIndex === videos.length) {
      setIsTaskComplete(true);
    }
  }, [currentVideoIndex, videos]);
  return (
    <div>
      {isTaskComplete ? renderTaskComplete() : renderCurrentVideo()}
    </div>
  );
  }
  export default UserTask
