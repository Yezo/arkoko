import { Changelog } from "../components/Changelog/Changelog";
import { Introduction } from "../components/Introduction/Introduction";
import { Navigation } from "../components/Navbar/Navigation";
import { TodoList } from "../components/TodoList/TodoList";

export const Homepage = () => {
  return (
    <main className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <body className="body-wrapper">
        <div className="grid gap-2 rounded font-primary text-sm lg:grid-cols-4">
          <section className="lg:col-span-2">
            <Introduction />
          </section>

          <section className="lg:col-span-2">
            <Changelog />
          </section>

          <section className="lg:col-span-4">
            <TodoList />
          </section>
        </div>
      </body>
    </main>
  );
};
