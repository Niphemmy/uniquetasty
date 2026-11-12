import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-brown text-cream text-xs md:text-sm">
      <div className="mx-auto max-w-wrap px-4 py-2 text-center">
        Orders above ₦50,000?{" "}
        <Link href="/custom-order" className="underline underline-offset-2 font-semibold">
          Message us for a quote.
        </Link>
      </div>
    </div>
  );
}
