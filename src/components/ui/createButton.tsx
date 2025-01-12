import Link from "next/link";
import Image from "next/image";

const CreateButton = ({
  href = "",
  link = "/CreatePosts",
  className = "",
  icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4=",
  children = "Create Post",
}) => {
  const buttonContent = (
    <div className={`flex md:text-sm sm: text-sm justify-center items-center p-2 gap-1 text-black bg-transparent hover:shadow-lg border-2 border-black ${className}`}>
      {icon && typeof icon === "string" ? (
        <Image src={icon} alt="icon" width={24} height={24} />
      ) : (
        icon
      )}
      <span>{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  if (link) {
    return (
      <Link href={link} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return <button className={className}>{buttonContent}</button>;
};

export default CreateButton;