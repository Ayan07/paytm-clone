import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => setUsers(res.data.users));
  }, [filter]);

  return (
    <>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="my-2">
        <input
          className="w-full rounded border py-1 px-2 border-slate-200"
          type="text"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between py-1">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center bg-slate-300 mt-1 mr-2">
          <div className="flex flex-col justify-center text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex">
        <Button
          label={"Send Money"}
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
        />
      </div>
    </div>
  );
}
