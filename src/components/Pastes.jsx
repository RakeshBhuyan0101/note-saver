import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye, faPenToSquare, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";

function formatISODate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function Pastes() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handelDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }
  return (
    <div className="bg-[#1E201E] h-screen">
      <div className="flex items-center justify-center pt-5 ">
        <input
          type="search"
          className="p-2 rounded-2xl w-screen bg-[#3C3D37]"
          placeholder="Search Paste"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center justify-center  gap-3">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div
                key={paste._id}
                className=" mt-6  container relative p-4 border border-white"
              >
                <div className="w-[60%]">
                    <h1 className="text-4xl text-white"> {paste.title}</h1>
                    <p className="text-white ">{paste.content}</p>
                </div>

                <div className="absolute top-4 right-4 flex space-x-4">
                  <button className="text-white">                 
                  <NavLink to={`/?pasteId=${paste._id}`}> <FontAwesomeIcon  icon={faPenToSquare} /> </NavLink>
                  </button>
                  <button className="text-white" >
                    <NavLink to={`/pastes/${paste._id}`}><FontAwesomeIcon icon={faEye} /> </NavLink>{" "}
                  </button>
                  <button className="text-white" onClick={() => handelDelete(paste?._id) }>
                      <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Message copied sucessfully");
                    }}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <button
                    className="text-white"
                    onClick={async () => {
                      const object = {
                        title: paste.title,
                        text: paste.content,
                      };
                      try {
                        await navigator.share(object);
                        toast.success("Shared Sucess");
                      } catch (error) {
                        toast.error("Something went wrong");
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div> 
                <div className="text-white text-sm absolute right-5 bottom-1">{formatISODate(paste.createdAt)}</div>              
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Pastes;

