import AuthFormLayout from "@/components/AuthFormLayout";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthFormLayout
      title="Welcome back"
      description="Sign in to your account to continue."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">
            Sign up for free
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthFormLayout>
  );
}
