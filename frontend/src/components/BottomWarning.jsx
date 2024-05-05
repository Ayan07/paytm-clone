import { Link } from "react-router-dom";

export const BottomWarning = ({ label, btnText, to }) => {
  return (
    <div className="flex justify-center text-sm py-2">
      <div>{label}</div>
      <Link className="underline pl-1 cursor-pointer" to={to}>
        {btnText}
      </Link>
    </div>
  );
};
