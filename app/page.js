import LinksTable from "./components/LinkTable";
import ShortenLink from "./components/ShortenLink";

export default function Home({searchParams}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
      <ShortenLink />
      <LinksTable searchParams={searchParams}/>
    </main>
  );
}
