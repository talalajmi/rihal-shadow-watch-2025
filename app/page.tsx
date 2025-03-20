import GoogleMap from "@/components/map/GoogleMap";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center flex-col space-y-8">
      <GoogleMap />
    </main>
  );
}
