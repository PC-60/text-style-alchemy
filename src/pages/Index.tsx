
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
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
    
    // Create 6 different formatted versions
    setFormattedResults([
      // Bold formatting with asterisks (markdown style)
      inputText.split(' ').map(word => `**${word}**`).join(' '),
      
      // Italic formatting
      `_${inputText}_`,
      
      // Mixed case (alternating)
      inputText.split('').map((char, i) => 
        i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join(''),
      
      // All uppercase with spacing
      inputText.toUpperCase().split('').join(' '),
      
      // With emojis
      `✨ ${inputText} ✨`,
      
      // Minimalist with special characters
      `| ${inputText.toLowerCase()} |`
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
              title="Bold Style" 
              text={formattedResults[0]} 
              description="Adds bold emphasis to each word"
            />
            <FormatCard 
              title="Italic Style" 
              text={formattedResults[1]} 
              description="Elegant italic formatting"
            />
            <FormatCard 
              title="Mixed Case" 
              text={formattedResults[2]} 
              description="Alternating case for each character"
            />
            <FormatCard 
              title="Spaced Uppercase" 
              text={formattedResults[3]} 
              description="All capitals with spacing"
            />
            <FormatCard 
              title="With Sparkles" 
              text={formattedResults[4]} 
              description="Adds decorative emoji elements"
            />
            <FormatCard 
              title="Minimalist" 
              text={formattedResults[5]} 
              description="Clean, simple formatting"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
