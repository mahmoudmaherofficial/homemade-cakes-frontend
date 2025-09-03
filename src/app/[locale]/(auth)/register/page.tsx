import PatternBG from "@/components/ui/pattern-bg/PatternBG";
import RegisterForm from "./registerForm";


const Page = () => {
  return (
    <main>
      <PatternBG />
      <div className="container !pt-18 h-svh flex justify-center items-center">
        <RegisterForm/>
      </div>
    </main>
  );
};

export default Page;
