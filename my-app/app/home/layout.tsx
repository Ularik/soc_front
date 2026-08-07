
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1 overflow-x-hidden relative">
        <div className="container mx-auto px-[10px] md:px-[20px]">
          {children}
        </div>
      </main>
    </>
  );
}
