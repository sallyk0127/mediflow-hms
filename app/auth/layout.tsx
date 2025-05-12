export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {children}
    </div>
  );
}