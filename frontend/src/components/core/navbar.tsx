export function NavBar() {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
      <h1 className="text-center text-xl font-medium">Scalable Chat App</h1>
      <p className="text-center text-xs font-light">
        Next.js, Express.js, PostgreSQL, Prisma, Socket.io, Redis, Kafka,
        Docker, Nginx
      </p>
    </div>
  );
}
