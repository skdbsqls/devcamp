import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="flex flex-col space-y-1.5 p-5 rounded-lg border bg-card text-card-foreground shadow-sm ">
        <Link href="/signup">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            회원가입
          </h3>
        </Link>
      </div>
    </div>
  );
}
