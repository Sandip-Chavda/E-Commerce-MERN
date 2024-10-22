import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="lg:hidden sm:block"
      >
        <AiOutlineMenu size={24} />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
          variant="outline"
        >
          Logout
          <MdLogout size={17} />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
