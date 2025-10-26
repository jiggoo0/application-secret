import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import services from '@/public/data/services.json';

export default function ServiceList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const isComingSoon = service.price === '-' || service.ctaText.includes('เปิดตัว');
        const isNew = service.title.includes('ใหม่') || service.title.includes('เปิดตัว');

        return (
          <Card
            key={index}
            className="flex flex-col justify-between border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
                <Image src={service.images[0]} alt={service.title} fill className="object-cover" />
              </AspectRatio>
              <div className="mt-4 flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  {service.title}
                </CardTitle>
                {isNew && <Badge variant="secondary">ใหม่</Badge>}
              </div>
              {!isComingSoon && <Badge className="mt-2 text-sm font-medium">{service.price}</Badge>}
            </CardHeader>

            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full" variant={isComingSoon ? 'secondary' : 'default'}>
                <a
                  href={service.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  {service.ctaText}
                </a>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
