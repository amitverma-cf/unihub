import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query";
import { useUserContext } from "../auth-provider";
import { LogOut, User } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <section className="topbar bg-white shadow-md">
      <div className="flex justify-end py-4 px-5">
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => signOut()}>
            <LogOut size={24} /> {/* Lucide logout icon */}
          </Button>
          <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
