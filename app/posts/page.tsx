import { ListPosts } from "@/entities/post/ui/ListPosts";

export default function Page() {
  return (
    <div>
      <h1>posts</h1>
      <div>
        <ListPosts posts={[]}/>
      </div>
    </div>
  );
}
