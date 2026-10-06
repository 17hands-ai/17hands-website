import { BrandButton } from "@/components/brand/BrandButton";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] pt-36 pb-24 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display text-5xl text-[var(--brand-text)] mb-6">This page doesn't exist.</h1>
        <p className="text-lg text-[var(--brand-text-2)] mb-10">The link may be old, or the page may have moved.</p>
        <BrandButton href="/" size="lg">Back to the home page</BrandButton>
      </div>
    </div>
  );
}
