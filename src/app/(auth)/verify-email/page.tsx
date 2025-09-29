'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Mock email address - in real app, get from auth state or URL params
  const emailAddress = 'user@example.com';

  // Resend cooldown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      // Mock API call
      console.log('Resending verification email to:', emailAddress);
      await new Promise(resolve => setTimeout(resolve, 1500));

      setResendCount(prev => prev + 1);
      setTimeLeft(60); // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    // In real app, check if email is verified
    router.push('/dashboard');
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to your email address
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Email Address */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Verification email sent to:
            </p>
            <p className="font-medium text-gray-900">{emailAddress}</p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Next steps:</h4>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Check your email inbox (and spam/junk folder)</li>
              <li>Click the verification link in the email</li>
              <li>Return here to continue</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              I&apos;ve verified my email
            </Button>

            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
              disabled={isResending || timeLeft > 0}
            >
              {isResending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : timeLeft > 0 ? (
                <span>Resend in {timeLeft}s</span>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend verification email
                </>
              )}
            </Button>

            {resendCount > 0 && (
              <p className="text-sm text-green-600 text-center">
                ✓ Verification email resent successfully
              </p>
            )}
          </div>

          {/* Alternative Actions */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Having trouble? You can:
              </p>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/register">Use a different email address</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/support">Contact support</Link>
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">💡 Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your spam/junk folder</li>
              <li>• Add noreply@sudokru.com to your contacts</li>
              <li>• The verification link expires in 24 hours</li>
              <li>• You can request a new link anytime</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}