
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FormatCard from '@/components/FormatCard';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [formattedResults, setFormattedResults] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      toast({
        title: "Text required",
        description: "Please enter some text to format",
        variant: "destructive"
      });
      return;
    }
    
    // Create 6 distinctly different formatted versions that are readable
    setFormattedResults([
      // Simple bold formatting
      `*${inputText}*`,
      
      // Plain text with quotes
      `"${inputText}"`,
      
      // ALL CAPS for emphasis
      inputText.toUpperCase(),
      
      // Dash separated for clarity
      `- ${inputText} -`,
      
      // Parentheses for formal tone
      `(${inputText})`,
      
      // With asterisks for highlighting
      `*** ${inputText} ***`
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Text Formatter</h1>
        
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Enter your text</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Textarea 
                placeholder="Type or paste your text here..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32 mb-4"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Formats
              </Button>
            </form>
          </CardContent>
        </Card>

        {formattedResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatCard 
              title="Bold Text" 
              text={formattedResults[0]} 
              description="Simple asterisks for bold emphasis"
            />
            <FormatCard 
              title="Quotation" 
              text={formattedResults[1]} 
              description="Text in quotation marks"
            />
            <FormatCard 
              title="ALL CAPS" 
              text={formattedResults[2]} 
              description="Uppercase for emphasis"
            />
            <FormatCard 
              title="Dash Format" 
              text={formattedResults[3]} 
              description="Text with dash separators"
            />
            <FormatCard 
              title="Parentheses" 
              text={formattedResults[4]} 
              description="Text in parentheses for formal tone"
            />
            <FormatCard 
              title="Triple Star" 
              text={formattedResults[5]} 
              description="Text with triple asterisks for highlighting"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
