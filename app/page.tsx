export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold font-montserratRegular text-primary mb-8">
          Next.js + Tailwind + Prisma + TypeGraphQL
        </h1>

        <p className="text-2xl mb-12 font-poppinsRegular">
          A modern full-stack boilerplate for your next web application
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeatureCard
            title="Frontend"
            description="Next.js 15+ with React 19, Tailwind CSS, and TypeScript"
          />
          <FeatureCard
            title="Backend"
            description="GraphQL API with TypeGraphQL and Apollo Server"
          />
          <FeatureCard
            title="Database"
            description="Prisma ORM with PostgreSQL for type-safe DB access"
          />
          <FeatureCard
            title="Authentication"
            description="JWT authentication with secure password hashing"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            label="GitHub"
            href="https://github.com/wajahatbanday/next-tailwind-prisma-typegraphql"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-primary mb-2 font-montserratRegular">
        {title}
      </h3>
      <p className="font-poppinsRegular">{description}</p>
    </div>
  );
}

function Button({
  label,
  href,
  primary = false,
}: {
  label: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <a
      target="_blank"
      href={href}
      className={`px-6 py-3 rounded-md font-medium transition-colors ${
        primary
          ? "bg-primary text-white hover:opacity-90"
          : "border border-primary text-primary hover:opacity-75"
      }`}
    >
      {label}
    </a>
  );
}
