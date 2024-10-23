import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { IoMdCart } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IoLogOutSharp } from "react-icons/io5";
import { logoutUser } from "@/redux/slices/authSlice";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((MenuItem) => (
        <Link
          key={MenuItem.id}
          to={MenuItem.path}
          className="font-medium text-sm hover:text-red-500 transition-all duration-200 hover:underline"
        >
          {MenuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent hover:bg-red-100 text-red-500 border border-red-500 hover:text-red-500 transition-all duration-300"
      >
        <IoMdCart size={22} />
        <span className="sr-only">User Cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-red-500 text-white font-semibold text-xl uppercase">
              {user?.userName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" className="w-56">
          <DropdownMenuLabel className="text-sm text-center">
            Logged in as :{" "}
            <span className="text-base font-bold ">{user?.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[1px]  mx-auto bg-red-500" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex !items-center cursor-pointer"
          >
            <FaUserEdit size={18} className="mr-2" />
            <span className="">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[0.5px] bg-red-500" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex !items-center cursor-pointer"
          >
            <IoLogOutSharp size={18} className="mr-2" />
            <span className="">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full  bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 shadow-md">
        <Link to={"/shop/home"} className="flex items-center gap-1">
          <img
            src={logo}
            alt="feather-logo"
            className="w-10 h-10 -rotate-45 animate-spin duration-1000 transition-all"
          />
          <span className="font-extrabold text-xl tracking-tighter">
            શ્રી ક્રિષ્ના ઇલેક્ટ્રિક
          </span>
        </Link>

        <Sheet className="">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent border border-red-500 hover:bg-red-100 transition-all duration-300 lg:hidden"
            >
              <LuMenu className="text-red-500" size={23} />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader className="mb-8 font-semibold text-xl border-b pb-4 border-red-500">
              Menubar
            </SheetHeader>
            <MenuItems />

            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block ">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
