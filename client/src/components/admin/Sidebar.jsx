import { adminSidebarMenuItems } from "@/config";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground cursor-pointer hover:text-red-500 transition-all duration-200 font-medium"
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          <menuItem.icon size={24} className="" />
          <span className="">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b mt-7 mb-4">
              <SheetTitle className="text-xl justify-center flex items-center gap-2 font-bold text-red-500">
                Admin Panel
                <MdOutlineAdminPanelSettings
                  className="text-red-500"
                  size={27}
                />
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <h1 className="text-xl font-bold text-red-500">Admin Dashboard</h1>
          <MdOutlineAdminPanelSettings className="text-red-500" size={27} />
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default Sidebar;
