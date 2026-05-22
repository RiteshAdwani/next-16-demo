import AuthFormLayout from "@/components/AuthFormLayout";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthFormLayout
      title="Create your account"
      description="Join Blogify and start sharing your stories."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthFormLayout>
  );
}
