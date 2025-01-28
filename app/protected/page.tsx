import CreatePost from "@/components/app/CreatePost";
import Post from "@/components/app/Post";
import SearchBox from "@/components/app/SearchBox";
import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts, error } = await supabase.from("posts").select("*");

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col">
      <SearchBox />
      {!posts && <p>Error: {error.message}</p>}
      {posts && posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          created_at={post.created_at}
          title={post.title}
          content={post.content}
          image={post.image}
          user_image={post.user_image}
          user_name={post.user_name}
          email={post.email}
          location={post.location}
        />))}
    </div>
  );
}
