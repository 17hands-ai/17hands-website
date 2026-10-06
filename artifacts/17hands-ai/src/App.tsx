import { useEffect } from "react";
import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbaseWidget } from "@/components/ChatbaseWidget";
import { pages, notFoundTitle } from "@/lib/pages";

// Pages
import Home from "@/pages/Home";
import ForYou from "@/pages/ForYou";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

/** Scroll to the top on route change, or to the hash target when one is present. Keeps <title> in sync. */
function ScrollManager() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = pages.find((p) => p.path === location)?.title ?? notFoundTitle;
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[var(--brand-amethyst)] focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
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
      <Route path="/for-you" component={ForYou} />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollManager />
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
        <ChatbaseWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
