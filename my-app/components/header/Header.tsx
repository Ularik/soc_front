import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center gap-5 px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SOC
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/reports"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Создать отчет
          </Link>
          <Link
            href="/view"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Аналитика
          </Link>
        </nav>
      </div>
    </header>
  );
}
