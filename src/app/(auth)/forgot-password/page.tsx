'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      console.log('Password reset request:', data);
      // Mock API call - in real app, call your password reset API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store email for confirmation message
      setEmailAddress(data.email);
      setIsEmailSent(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent password reset instructions to your email address
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                We sent a password reset link to:
              </p>
              <p className="font-medium text-gray-900 mb-6">{emailAddress}</p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">What&apos;s next?</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside text-left">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Create a new password</li>
                  <li>Sign in with your new password</li>
                </ol>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmailAddress('');
                }}
                variant="outline"
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send to a different email
              </Button>

              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Didn&apos;t receive the email? Check your spam folder or</p>
              <button
                onClick={() => onSubmit({ email: emailAddress })}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                resend the email
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-orange-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Forgot your password?</CardTitle>
        <CardDescription>
          No worries! Enter your email and we&apos;ll send you reset instructions
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
              autoFocus
            />
            {errors.email && (
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email.message}</span>
              </div>
            )}
            <p className="text-xs text-gray-500">
              We&apos;ll send reset instructions to this email address
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending instructions...</span>
              </div>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Reset Instructions
              </>
            )}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h4 className="font-medium text-gray-900 mb-2">Need more help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you&apos;re still having trouble accessing your account, we&apos;re here to help.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}