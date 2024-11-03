import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const despatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)

  function createPaste () {
    if ( !title && !value) {
      toast("Title and content is empty")
      return
    }
    const paste = {
      title : title,
      content : value,
      _id : pasteId || Date.now().toString(36),
      createdAt : new Date().toISOString()
    }

    if (pasteId) {
      // update Paste
      console.log("function is clicked");
      despatch(updateToPastes(paste))
    }
    else {
      // create Paste
      despatch(addToPastes(paste))
    }

    // after creation or updation
    setTitle("")
    setValue("")
    setSearchParams({})
  }

  useEffect(() => {
    if (pasteId) {
        const paste = allPastes.find( (p) => {
         return  p._id === pasteId
        })
        setTitle(paste.title);
        setValue(paste.content);
    }
  }, [pasteId])
  
  return (
    <div className="bg-[#1E201E]">
      <div className="flex items-center justify-center gap-5" >
        <input
          className="p-2 rounded-xl mt-3 w-[40%] pl-3 bg-[#3C3D37] "
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="p-2 rounded-xl mt-3 bg-[#697565] " onClick={createPaste } >
          {pasteId ? "Update My Paste" : "Create My Paste "}
        </button>
      </div>

      <div className=" flex items-center justify-center">
        <textarea
          className="rounded-2xl mt-4 p-4 min-w-[90%] h-[88vh] bg-[#3C3D37]"
          value={value}
          placeholder="enter content here"
          rows={20}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Home;
