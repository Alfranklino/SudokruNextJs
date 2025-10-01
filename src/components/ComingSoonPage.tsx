'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, ArrowLeft, Home } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description: string;
  estimatedRelease?: string;
  features?: string[];
  backLink?: string;
  backLinkText?: string;
}

export function ComingSoonPage({
  title,
  description,
  estimatedRelease,
  features,
  backLink = '/dashboard',
  backLinkText = 'Back to Dashboard'
}: ComingSoonPageProps) {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Construction className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
                <p className="text-lg text-slate-600 mb-4">{description}</p>

                {estimatedRelease && (
                  <p className="text-sm text-slate-500">
                    <strong>Estimated Release:</strong> {estimatedRelease}
                  </p>
                )}
              </div>

              {features && features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Planned Features:</h2>
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button variant="default" asChild>
                  <Link href={backLink}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {backLinkText}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
