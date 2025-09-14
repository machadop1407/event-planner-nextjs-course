import { auth } from "@/auth";
import { GithubSignInButton } from "@/components/GithubSignInButton";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-foreground font-bold text-3xl">Welcome</h1>
          <p className="text-muted mt-2">
            Sign in or create an account to continue
          </p>
        </div>
        <div className="card p-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-muted mb-6">
                Use your GitHub account to sign in or create a new account
              </p>
            </div>

            <GithubSignInButton />

            <div className="text-center">
              <p className="text-sm text-muted">
                By signing in, you agree to our terms of service and privacy
                policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
