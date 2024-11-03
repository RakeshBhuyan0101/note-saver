import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";

function ViewPaste() {
  const {id} = useParams()
  const allPaste = useSelector( (state) => state.paste.pastes)
  const paste = allPaste.filter( (p) => p._id === id)[0]

  if (paste)
  return (
    <div className="bg-[#1E201E]" >
      <div className="flex items-center justify-center gap-5">
        <input
          disabled
          className="p-2 rounded-xl mt-3 w-[40%] pl-3 bg-[#3C3D37]"
          type="text"
          placeholder="enter title here"
          value={paste.title}
        />
      </div>

      <div className="flex items-center justify-center">
        <textarea
          className="rounded-2xl mt-4 p-4 min-w-[90%] h-[88vh] bg-[#3C3D37]"
          disabled
          value={paste.content}
          placeholder="enter content here"
          rows={10}
        />
      </div>

    </div>
  )
}

export default ViewPaste