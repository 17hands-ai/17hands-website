import { useEffect } from "react";
import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbaseWidget } from "@/components/ChatbaseWidget";
import { pages, notFoundTitle } from "@/lib/pages";
import { I18nProvider, prefixOf, useI18n, type Content, type Locale } from "@/i18n";
import { en } from "@/i18n/en";

// Pages
import Home from "@/pages/Home";
import DigitalDefenders from "@/pages/DigitalDefenders";
import Natural from "@/pages/Natural";
import ForYou from "@/pages/ForYou";
import Packages from "@/pages/Packages";
import BioPages from "@/pages/BioPages";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

/** Scroll to the top on route change, or to the hash target when one is present. Keeps <title> in sync. */
function ScrollManager() {
  const [location] = useLocation();
  const { content } = useI18n();
  useEffect(() => {
    document.documentElement.lang = content.htmlLang;
    document.title = content.meta[location]?.title ?? pages.find((p) => p.path === location)?.title ?? notFoundTitle;
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location, content]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { content } = useI18n();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md on-accent focus:bg-[var(--brand-amethyst)] focus:px-4 focus:py-3 focus:text-white"
      >
        {content.common.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/digital-defenders" component={DigitalDefenders} />
      <Route path="/natural" component={Natural} />
      <Route path="/for-you" component={ForYou} />
      <Route path="/packages" component={Packages} />
      <Route path="/bio-pages" component={BioPages} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      {/* Old receptionist-site URLs, kept working. */}
      <Route path="/services"><Redirect to="/#services" replace /></Route>
      <Route path="/case-studies"><Redirect to="/" replace /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * `ssrPath` is set only when pre-rendering a route at build time (see entry-server.tsx).
 * `locale` and `content` come from the URL prefix: main.tsx on the client, entry-server.tsx at build.
 * The router base carries the locale, so every <Link href="/packages"> stays inside /ru or /es.
 */
function App({ ssrPath, locale = "en", content = en }: { ssrPath?: string; locale?: Locale; content?: Content }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider locale={locale} content={content}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") + prefixOf(locale)} ssrPath={ssrPath}>
            <ScrollManager />
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
        </I18nProvider>
        <Toaster />
        <ChatbaseWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
