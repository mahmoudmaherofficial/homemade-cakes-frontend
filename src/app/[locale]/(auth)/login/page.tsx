import PatternBG from "@/components/ui/pattern-bg/PatternBG";
import LoginForm from "./loginForm";

const Page = () => {
  return (
    <main>
      <PatternBG />
      <div className="container !pt-18 h-svh flex justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
