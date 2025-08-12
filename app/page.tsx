import Timer from "@/components/timer";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Simple Pomodoro </h1>
      <Timer />
    </div>
  );
}
