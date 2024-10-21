import { createClient } from "@/utils/supabase/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  // Define a list of allowed redirects to avoid open redirect vulnerabilities
  const allowedRedirects = [`${origin}/dashboard`, `${origin}/protected`];

  if (code) {
    // Create a Supabase client instance
    const supabase = createClient();

    try {
      // Exchange the OAuth code for a session
      await supabase.auth.exchangeCodeForSession(code);

      // Create a route handler client for consistency
      const supabaseRoute = createRouteHandlerClient({ cookies });
      await supabaseRoute.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(`${origin}/error`); // Redirect to an error page
    }
  }

  // Check if redirectTo is allowed
  if (redirectTo && allowedRedirects.includes(`${origin}${redirectTo}`)) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Default redirect to the protected route if no valid redirectTo is provided
  return NextResponse.redirect(`${origin}/protected`);
}