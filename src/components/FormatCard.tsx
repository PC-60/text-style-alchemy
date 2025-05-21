
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormatCardProps {
  title: string;
  text: string;
  description: string;
}

const FormatCard = ({ title, text, description }: FormatCardProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${title} format copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 p-3 rounded-md min-h-24 max-h-40 overflow-y-auto break-words whitespace-pre-wrap">
          {text}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 hover:bg-blue-50"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" /> Copy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormatCard;
